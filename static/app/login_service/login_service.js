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
            isLoggedIn: function() {
                $http.get('/isLoggedin').then(function(response) {
                    if(response.data == true) {
                        return true
                    } else {
                        return false;
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