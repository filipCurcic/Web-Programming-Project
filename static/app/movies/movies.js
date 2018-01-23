(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('moviesCtrl', ['$http', '$stateParams', '$state', function($http, $stateParams, $state) {
        var lv = this;

        lv.movies = [];
        lv.ratings = [];
        lv.pop = [];
        lv.moviesGenres = [];
        lv.moviesDirectors = [];


        lv.fetchMovies = function() {
            $http.get('/movies').then(
                function(response) {
                    lv.movies = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        }
        lv.getRatings = function() {
            $http.get("/ratings").then(function(response) {      
                lv.ratings = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }


        lv.mostPopular = function() {
            $http.get("/popularity").then(function(response) {      
                lv.pop = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        lv.getMoviesByGenre = function(idgenre) {
            $http.get("/moviesByGenre/"+$stateParams.idgenre).then(function(response) {      
                lv.moviesGenres = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        lv.getMoviesByDirector = function(idperson) {
            $http.get("/moviesByDirector/"+$stateParams.idperson).then(function(response) {      
                lv.moviesDirectors = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        

        lv.fetchMovies();
        lv.getRatings();
        lv.mostPopular();
        lv.getMoviesByGenre();
        lv.getMoviesByDirector();
       
    }]);
})(angular);