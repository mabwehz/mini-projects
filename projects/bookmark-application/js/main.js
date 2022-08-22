// listen to form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    // prevent form from submitting
    e.preventDefault();

    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!siteName || !siteUrl) {
        alert('Please fill up the form');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
    };

    // test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // initialize bookmarks
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        // set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);
        // Re-set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset();

    fetchBookmarks();
}


function fetchBookmarks() {
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // get output id
    var bookmarkResults = document.getElementById('bookmarkResults');

    // build output
    bookmarkResults.innerHTML = '';

    if (bookmarks) {

        bookmarks.forEach((bookmark) => {
            bookmarkResults.innerHTML += '<div class="card card-body bg-light">' +
                '<h3>' +
                bookmark.name +
                '<a class="btn btn-default" target="_blank" href="' + bookmark.url + '">visit</a>' +
                '<button onclick="deleteBookmark(\'' + bookmark.url + '\')" class="btn btn-danger">delete</button>' +
                '</h3>' +
                '</div>';
        });
    }
}

function deleteBookmark(bookmarkUrl) {
    // get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // filter out the bookmarks that are not equal to the bookmark url to delete
    var updatedBookmarks = bookmarks.filter((bookmarkToFilter) => bookmarkToFilter.url != bookmarkUrl);

    // reset the local storage
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

    // refetch bookmarks
    fetchBookmarks();
}