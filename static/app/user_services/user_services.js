(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('userCtrl', ['loginService', '$state', '$http', function($loginService, $state, $http) {
        var lv = this;

        lv.newPerson = {
           
        }
        lv.newUser = {
            "first_name": "",
            "last_name": "",
            "gender": "",
            "date_of_birth": "",
            "username": "",
            "password": "",
            "email": "",
            "person_idperson": "",
            "user_type": "User"
        }


        lv.registerPerson = function() {
            $http.post("/registration", lv.newPerson).then(function(response){
            },
            function(reason){
                console.log(reason);
            })
        };
        lv.registerUser = function() {
            $http.post("/registration", lv.newUser).then(function(response){
                alert("You have successfully registered")
            },
            function(reason){
                console.log(reason);
            })
        };

        
        

    
    }]);
})(angular);