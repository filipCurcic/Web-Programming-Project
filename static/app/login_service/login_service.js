(function(angular) {
    //Kreiranje novog modula
    var loginService = angular.module('loginService', []);
    loginService.factory('loginService', ['$http', function($http) {
        var ls = {
            login: function(user, onSuccess, onFailure) {
                return $http.post('/login', user).then(function(response) {
                    if(response.data['success'] == true) {
                        onSuccess();
                    } else {
                        onFailure();
                    }
                },
                function(reason) {
                    console.log(reason);
                })
            },
            isLoggedIn: function(onTrue, onFalse, onFalse2) {
                $http.get('/isLoggedin').then(function(response) {
                    if(response.data == true) {
                        return onTrue();
                    } else if (response.data["status"] == "wrong") {
                        return onFalse();
                    }
                    else if (response.data["status"] == "notFound") {
                        return onFalse2();
                    }
                },
                function(reason) {
                    console.log(reason)
                })
            },
            logout: function(onTrue, onFalse) {
                $http.get('/logout').then(function(response) {
                    if(response.data == true) {
                        onTrue();
                    } else {
                        onFalse();
                    }
                },
                function(reason) {
                    console.log(reason)
                })
            }
        }

        return ls;
    }]);
})(angular);