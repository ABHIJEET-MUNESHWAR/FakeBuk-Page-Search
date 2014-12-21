  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    //console.log('statusChangeCallback');
    //console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      if(window.location.href != "http://fakebuk-page-search.parseapp.com/page.html") {
          document.getElementById('status').innerHTML = 'Please log into this app.';
        }
      
        if(window.location.href != "http://fakebuk-page-search.parseapp.com/") {
          alert("Please log into this app.");
          window.location.href = "http://fakebuk-page-search.parseapp.com/"
        }
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
        if(window.location.href != "http://fakebuk-page-search.parseapp.com/page.html") {
          document.getElementById('status').innerHTML = 'Please log into Facebook.';
        }
      
        if(window.location.href != "http://fakebuk-page-search.parseapp.com/") {
          alert("Please log into Facebook.");
          window.location.href = "http://fakebuk-page-search.parseapp.com/"
        }
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '391846640971339',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    //console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        //console.log('Successful login for: ' + response.name);
        var userInfo = document.getElementById("user-info");
        //userInfo.innerHTML = response.id + ' - ' + response.name;
        var fbUserID = response.id
        var fbUserName = response.name;
        var loggedInAs = document.getElementById("loggedInAs");
        loggedInAs.innerHTML = fbUserName;
        if(window.location.href != "http://fakebuk-page-search.parseapp.com/page.html") {
          document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
          window.location.href = "/page.html"
        }
    });
  }

var logoutBtnFunc = function (){
      FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            FB.logout(function(response) {
                window.location.href = "http://fakebuk-page-search.parseapp.com/"
            });
        }
    });
};