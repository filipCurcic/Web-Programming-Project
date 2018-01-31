(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('LoginCtrl', ['loginService', '$state', '$http',  function(loginService, $state, $http) {
        var that = this;
        that.showLogin = false;
        that.failed = false;
        that.loggedIn = false;
        that.user = {
            'username': '',
            'password': ''
        }
        that.loggedInUser = {};

        that.getUser = function() {
            $http.get('/loggedInUser').then(
                function(response) {
                    that.loggedInUser = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        that.logout = function() {
            that.loggedIn = false;
            alert("You have successfully logged out")
            
        }

        that.login = function() {
            loginService.login(that.user, function() {
                that.loggedIn = true;
                $state.go('home');
                location.reload();
               
            },
            function() {
                that.failed = true;
            })
        }
        

        loginService.isLoggedIn(function() {
            if ($state.includes('login')) {
                $state.go('home');
            }
        },
        function() {
            that.showLogin = true;
        });

        that.logStatus = function() {
            $http.get('/isLoggedin').then(function(response) {
                if(response.data == true) {
                    that.loggedIn = true;
                } else {
                    that.loggedIn = false;
                }
            },
                function(reason) {
                    console.log(reason);
                }
            );
        }

        setInterval(that.getUser(), 5)
    
        setInterval(that.logStatus(), 5)

        
        

        


    }]);
})(angular);