(function (angular) {
    var app = angular.module("Aplikacija");
    app.controller("ctrl", function ($http) {
        var lv = this;


        lv.filmovi = [];
        lv.ratings = [];
        lv.pop = [];

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

        lv.search = function() {
            var input, filter;
            input = document.getElementById("movSearch");
            
        }


        lv.dobaviRatings();
        lv.dobaviFilmove();
        lv.najPop();

    });
})(angular);
