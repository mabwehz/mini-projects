window.fbAsyncInit = function () {
    FB.init({
        appId: '389398311555415',
        cookie: true,
        xfbml: true,
        version: 'v3.0'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log('response from get login status: ', response);
    if (response.status === 'connected') {
        console.log('Logged in');
        setElements(true);
        testApi(); // defined in main.js
    } else {
        console.log('Not logged in');
        setElements(false);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

function logout() {
    console.log('FB logout: ');
    FB.logout(function (response) {
        console.log('resonse from FB logout: ', response);
        setElements(false);
    });
}