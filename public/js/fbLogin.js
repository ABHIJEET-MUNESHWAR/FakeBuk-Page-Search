   
        // initialize the library with the API key
        FB.init({
        appId      : '391846640971339',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });

        // fetch the status on load
        FB.getLoginStatus(handleSessionResponse);
        var loginClickFunc = function () {
            FB.login(handleSessionResponse);
        };

        // handle a session response from any of the auth related calls
        function handleSessionResponse() {
            FB.api('/me', function(response) {
                //console.log(response);
                var userInfo = document.getElementById("user-info");
                userInfo.innerHTML = response.id + ' - ' + response.name;
                if( (typeof(response.id) != "undefined") && (typeof(response.name) != "undefined") ) {
                    window.location.href = "/page.html"
                    //saveCurrentUser(response.id, response.name);
                } else {
                    //deleteUserInfo();
                }
            });
        }
        