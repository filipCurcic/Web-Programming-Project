(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('movieCtrl', ['$http', '$state', '$stateParams', function($http, $state, $stateParams) {
        var lv = this;

        lv.movie = {};
        lv.movieActors = [];
        lv.genres = [];


        lv.getMovie = function() {
            $http.get("/movies/"+$stateParams.idmovie).then(function(response){
                lv.movie = response.data;
            },
            function(reason){
                console.log(reason)
            });
        };
        lv.getActors = function(idmovie) {
            $http.get("/moviesActors/"+$stateParams.idmovie).then(function(response) {      
                lv.movieActors = response.data;
                
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.fetchGenres = function(idmovie) {
            $http.get("/moviesGenres/"+$stateParams.idmovie).then(function(response) {      
                lv.genres = response.data;
                
            }, function(reason) {
                console.log(reason);
            });
        }

        lv.getMovie();
        lv.getActors();
        lv.fetchGenres();
    }]);
})(angular);