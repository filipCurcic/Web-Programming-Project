(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('userCtrl', ['loginService', '$state', '$http', function($loginService, $state, $http) {
        var lv = this;

        lv.newPerson = {
            "first_name": "",
            "last_name": "",
            "gender": "",
            "date_of_birth": "",
        }
        lv.newUser = {
            "username": "",
            "password": "",
            "email": "",
            "person_idperson": "",
            "user_type": "User"
        }


        /*lv.registerPerson = function() {
            $http.post("/register", lv.newPerson).then(function(response){
            },
            function(reason){
                console.log(reason);
            })
        };
        lv.registerUser = function() {
            $http.post("/register", lv.newUser).then(function(response){
                
            },
            function(reason){
                console.log(reason);
            })
        };*/

        
        

    
    }]);
})(angular);