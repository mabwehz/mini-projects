// view properties
let profileView = document.getElementById('profileView');
let fbLogOutBtn = document.getElementById('fbLogOutBtn');
let fbLogInBtn = document.getElementById('fbLogInBtn');
let feedView = document.getElementById('feedView');

// called from facebook.js
function setElements(isLoggedIn) {
    if (isLoggedIn) {
        profileView.style.display = 'block';
        feedView.style.display = 'block';
        fbLogOutBtn.style.display = 'block';
        fbLogInBtn.style.display = 'none';
    } else {
        profileView.style.display = 'none';
        feedView.style.display = 'none';
        fbLogOutBtn.style.display = 'none';
        fbLogInBtn.style.display = 'block';
    }
}

function testApi() {
    FB.api('/me?fields=id,name,email,birthday,age_range,gender,friends,posts', (response) => {
        if (response && !response.error) {
            buildProfile(response);
        }

        FB.api('/me/feed', (response) => {
            if(response && !response.error) {
                buildFeed(response);
            }
        })
    });
}

function buildProfile(user) {
    let profile = `
        <h3>${user.name}</h3>
        <ul class="list-group">
            <li class="list-group-item">User ID: ${user.id}</li>
            <li class="list-group-item">Email: ${user.email}</li>
            <li class="list-group-item">Gender: ${user.gender}</li>
            <li class="list-group-item">Birthday: ${user.birthday}</li>
            <li class="list-group-item">Age range: ${user.age_range.min} years</li>
            <li class="list-group-item">Number of friends: ${user.friends.summary.total_count}</li>
        </ul>
    `;

    profileView.innerHTML = profile;
}

function buildFeed(feed) {
    // let output = document.createElement('ul', {class: 'list-group'});
    // for(let item of feed.data) {
    //     let listItem = document.createElement('li', {class: 'list-group-item'});
    //     listItem.appendChild(document.createTextNode(item.message));
    //     output.appendChild(listItem);
    // }
    // feedView.appendChild(output);

    let output = `<h3>Latest Posts</h3>`;

    for(let item of feed.data) {
        if(item.message) {
            output += `
                <div class="card border-info mb-3">
                <div class="card-header">${new Date(item.created_time)}</div>
                    <div class="card-body text-info">
                        <p class="card-text">${item.message}</p>
                    </div>
                </div>
            `
        }
    }

    feedView.innerHTML = output;
}