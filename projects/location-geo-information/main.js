// global variables
let locationOuput = document.getElementById('locationOuput');
let searchField = document.getElementById('searchLocation');
searchField.addEventListener('search', searchLocation);

// search location base on user input in search field
function searchLocation() {
    // clear animation
    searchField.style.animation = '';

    const geocoder = new google.maps.Geocoder;

    // geocoding requests
    geocoder.geocode({
        address: this.value,
    }, (results, status) => {
        if (status === 'OK') {
            displayLocation(results[0]);
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
}

function displayLocation(locationResult) {
    console.log('locationResult:: ', locationResult);

    let listTemplate = '';

    for (let item of locationResult.address_components) {
        // console.log('item:: ', item);
        listTemplate += `<li class="list-group-item"><strong class="text-uppercase">${removeUnderscore(item.types[0])}</strong>: ${item.long_name}</li>`;
    }

    const locationTemplate = `
    <div class="card">
    <div class="card-header shadow-sm p-3 mb-5 bg-white">
      ${locationResult.formatted_address}
    </div>
    <ul class="list-group list-group-flush">
      ${listTemplate}
    </ul>
        <p class="pl-3 mt-4">
            <span class="mr-4">
                <strong class="text-primary">Latitude</strong>: ${locationResult.geometry.location.lat()}
            </span>
            <span>
                <strong class="text-primary">Longitude</strong>: ${locationResult.geometry.location.lng()}
            </span>
        </p>
  </div>`;

    locationOuput.innerHTML = locationTemplate;
}

// keymapping for search shortcut
// pressing shift s => enter search
document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.shiftKey && event.which == 83) {
        searchField.style.animationName = 'searchAnimation';
        searchField.style.animationDuration = '4s';
        searchField.style.animationTimingFunction = 'ease';
        searchField.style.animationIterationCount = 'infinite';
        return searchField.focus();
    }
});


function removeUnderscore(stringToFormat) {
    if (stringToFormat) {
        return stringToFormat.replace(/_/g, ' ');
    }
}