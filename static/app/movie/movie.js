(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('movieCtrl', ['$http', '$state', '$stateParams', function($http, $state, $stateParams) {
        var lv = this;

        lv.movie = {};
        lv.movieActors = [];
        lv.genres = [];
        lv.userWatchlist = [];
        lv.movieId = $stateParams.idmovie;
        lv.Add = {
            "movie_idmovie": lv.movieId,
        }  

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

        
        
        lv.watchlist = function() {
            $http.get('/watchlist').then(
                function(response) {
                    lv.userWatchlist = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        };

        

        lv.watchlist();
        lv.addToWatchlist = function() {
            
            $http.post("/AddToWatchlist", lv.Add).then(function(response){   
                if(response.data["status"] == "done") {
                    alert("You have added that movie to your watchlist")
                }
                else if (response.data["status"] == "error") {
                    alert("That movie already exists in your watchlist!")
                }
            },
            function(reason){
                console.log(reason);
            })
        }
                

        lv.getMovie();
        lv.getActors();
        lv.fetchGenres();
    }]);
})(angular);