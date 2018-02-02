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
        that.editUser = {
            "first_name": "",
            "last_name": "",
            "username": "",
            "email": "",

        };

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

        that.editProfile = function() {
            if(that.editUser["first_name"] == ''){
                that.editUser["first_name"] = that.loggedInUser["first_name"];
            }
            if(that.editUser["last_name"] == ''){
                that.editUser["last_name"] = that.loggedInUser["last_name"];
            }
            if(that.editUser["username"] == ''){
                that.editUser["username"] = that.loggedInUser["username"];
            }
            if(that.editUser["email"] == ''){
                that.editUser["email"] = that.loggedInUser["email"];
            }
            $http.put("/editedProfile", that.editUser).then(function(response){
                if(response.data["status"] == 'success') {
                    alert("You have saved your changes!")
                    location.reload();
                }
                else if (response.data["status"] == 'error') {
                    alert("That username or email already exist")
                }
                
            },
            function(reason){
                
                console.log(reason)
            });
        };

        that.login = function() {
            loginService.login(that.user, function() {
                that.loggedIn = true;
                $state.go('home');
                location.reload();
               
            },
            function() {
                that.failed = true;
                alert("Username and password do not match")
            },
            function() {
                that.failed = true;
                alert("That username does not exist")
            }
            )
        }
        

        loginService.isLoggedIn(function() {
            if ($state.includes('login') || $state.includes('register')) {
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