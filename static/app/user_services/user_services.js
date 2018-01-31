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
                $state.transitionTo('app.login')
                alert("You have successfully registered");
                
            },
            function(reason){
                console.log(reason);
            })
        };

        
        
        

    
    }]);
})(angular);