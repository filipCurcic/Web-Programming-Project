(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('movieCtrl', ['$http', '$state', '$stateParams', function($http, $state, $stateParams) {
        var lv = this;

        lv.movie = {};
        lv.movieActors = [];
        lv.genres = [];
        lv.userWatchlist = [];
        lv.movieId = $stateParams.idmovie;
        lv.ratedMovie = {
            "movie_rating": "",
            "movie_idmovie": lv.movieId
        }
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
                else if(response.data["status"] == "logError") {
                    alert("You have to be logged in")
                }
            },
            function(reason){
                console.log(reason);
            })
        }

        lv.removeFromWatchlist = function(idmovie) {
            $http.delete("/watchlist/"+idmovie).then(function(response){
                lv.watchlist();
            },
            function(reason){
                
                console.log(reason)
            });
        };

        lv.rateMovie = function() {
            $http.post("/rateMovie", lv.ratedMovie).then(function(response){   
                if(response.data["status"] == "done") {
                    alert("You have sucessfully rated that movie")
                }
                else if (response.data["status"] == "error") {
                    alert("asd")
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