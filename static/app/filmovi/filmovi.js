(function (angular) {
    var app = angular.module("Aplikacija");
    app.controller("ctrl", function ($http) {
        var lv = this;


        lv.filmovi = [];
        lv.ratings = [];
        lv.pop = [];
        lv.loggedin = {};
        lv.username = "";
        lv.password = "";
        lv.people = [];
        lv.selecteedActor =[];
        lv.directors = [];
        lv.selectedDirector = [];

        lv.dobaviFilmove = function() {
            $http.get("/filmovi").then(function(response) {      
                lv.filmovi = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.dobaviRatings = function() {
            $http.get("/ratings").then(function(response) {      
                lv.ratings = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.najPop = function() {
            $http.get("/popularity").then(function(response) {      
                lv.pop = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        
        lv.checkLogin = function () {
            $http.post("/login", {"username": lv.username, "password": lv.password}).then(function (response) {
                lv.loggedin = response.data;
                console.log(lv.loggedin);
                alert("You have succefully logged in");
                
            }, function (reason) {
                alert("You have entered an incorrect username or password!")
            });
        }

        lv.search = function() {
            var input, filter;
            input = document.getElementById("movSearch");
            
        }
        lv.dobaviLjude = function() {
            $http.get("/actors").then(function(response) {      
                lv.people = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.getDirectors = function() {
            $http.get("/directors").then(function(response) {      
                lv.directors = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }


        lv.dobaviRatings();
        lv.dobaviFilmove();
        lv.najPop();
        lv.dobaviLjude();
        lv.getDirectors();
    });
})(angular);