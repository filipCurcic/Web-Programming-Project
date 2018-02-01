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


        lv.registerUser = function() {
            $http.post("/registration", lv.newUser).then(function(response){
                if(response.data["status"] == "done") {
                    $state.go('home');
                    alert("You have successfully registered");
                }
                else if(response.data["status"] == "error") {
                    alert("A user with that username or email already exists")
                }
                
                
            },
            function(reason){
                console.log(reason);
            })
        };

        
        
        

    
    }]);
})(angular);