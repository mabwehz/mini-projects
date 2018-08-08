let myMap;
let churchMarkers = [];
let churchCluster = [];

const defaultPosition = {
    name: 'Jos',
    coordinates: {
        lat: 9.8965,
        lng: 8.8583
    }
};
let numerOfChurchesOutput = document.querySelectorAll('.footer h5 span')[0];
numerOfChurchesOutput.innerHTML = 0;
let switchCheckbox = document.getElementById('switchCheckbox');
switchCheckbox.checked = false;

let getLocationMarkerImage = () => {
    return {
        url: 'https://n4-media-fp.akamaized.net/accounts/img/badges/favorites_gold.svg',
        scaledSize: new google.maps.Size(45, 45),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
    };
};

let getMapStyle = () => {
    return [{
        elementType: 'geometry',
        stylers: [{
            color: '#242f3e'
        }]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#242f3e'
        }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#746855'
        }]
    },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#d59563'
        }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#d59563'
        }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
            color: '#263c3f'
        }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#6b9a76'
        }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
            color: '#38414e'
        }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#212a37'
        }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#9ca5b3'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
            color: '#746855'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
            color: '#1f2835'
        }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#f3d19c'
        }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
            color: '#2f3948'
        }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#d59563'
        }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
            color: '#17263c'
        }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#515c6d'
        }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
            color: '#17263c'
        }]
    }
    ];
};

switchCheckbox.addEventListener('change', (e) => {
    console.log('churchMarkers:: ', churchMarkers);
    console.log('churchCluster:: ', churchCluster);

    if (e.target.checked) {
        // add markers to marker cluster
        churchCluster = prepareChurchCluster(churchMarkers);
    } else {
        // remove markers from marker cluster
        if (churchMarkers.length > 0) {
            churchCluster.removeMarkers(churchMarkers);
        }
    }
});

function initMap() {

    // prepare map options and style
    const myMapOptions = {
        zoom: 11,
        center: defaultPosition.coordinates,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            mapTypeIds: ['roadmap', 'terrain']
        },
        styles: getMapStyle()
    };

    // create a google map
    myMap = new google.maps.Map(document.getElementById('map'), myMapOptions);
    myMap.addListener('click', (event) => {
        getGeocodeName(event.latLng).then((resolvedName) => {
            let name = resolvedName;
            console.log('name:: ', name);
            const markerFeatures = {
                location: event.latLng,
                infoWindowContent: `<h2>${name}</h2>`,
            };

            addChurchMarker(markerFeatures);
            if (switchCheckbox.checked) {
                churchCluster = prepareChurchCluster(churchMarkers);
            }
            showNumberOfChurches(churchMarkers.length);
        }, (error) => console.log('Error: ', error));
    });

    // add marker to map
    let marker = new google.maps.Marker({
        position: defaultPosition.coordinates,
        map: myMap,
        // animation: google.maps.Animation.DROP,
        title: defaultPosition.name,
        icon: getLocationMarkerImage(),
    });

    // prepare info window for default location
    let infoWindow = createInfoWindow(`<h1>This is ${defaultPosition.name}</h2>`);

    // on clicking default location maker, show info window
    marker.addListener('click', () => {
        infoWindow.open(myMap, marker);
    });

}

function createInfoWindow(content) {
    return new google.maps.InfoWindow({
        content: content,
    });
}

function getGeocodeName(location) {
    let geocoder = new google.maps.Geocoder;

    // geocoding requests
    return new Promise((resolve, reject) => {
        geocoder.geocode({
            location: location,
        }, (results, status) => {
            if (status === 'OK') {
                resolve(!results[0].formatted_address.match(/Unnamed Road/) ? results[0].formatted_address : results[1].formatted_address);
            } else {
                window.alert('Failed to get information about location because: ' + status);
                reject('unknown');
            }
        });
    });
}

function addChurchMarker(markerFeature) {
    // add clicked location to church markers
    let marker = new google.maps.Marker({
        position: markerFeature.location,
        map: myMap,
        label: 'C',
    });

    if (markerFeature.infoWindowContent) {
        console.log(markerFeature);
        let infoWindow = createInfoWindow(markerFeature.infoWindowContent);
        marker.addListener('click', () => {
            infoWindow.open(myMap, marker);
        })
    }

    churchMarkers.push(marker);
}


function prepareChurchCluster(churchMarkers) {
    return new MarkerClusterer(
        myMap,
        churchMarkers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        }
    );
}

function showNumberOfChurches(numberOfChurches) {
    numerOfChurchesOutput.innerHTML = numberOfChurches;
}
