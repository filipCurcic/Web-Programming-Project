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
        lv.review = {
            "review": "",
            "recommendation": ""
        }
        lv.userReviews = [];
        lv.movieReviews = [];
        

        lv.ratingsByUser = [];
        lv.movieRatingByUser = [];
        
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

        lv.ratings = function() {
            $http.get('/ratingsByUser').then(
                function(response) {
                    lv.ratingsByUser = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        };

        lv.movieRating = function() {
            $http.get('/ratingsByUser/'+$stateParams.idmovie).then(
                function(response) {
                    lv.movieRatingByUser = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            );
        };


        lv.rateMovie = function() {
            $http.post("/rateMovie", lv.ratedMovie).then(function(response){   
                if(response.data["status"] == "done") {
                    alert("You have sucessfully rated that movie")
                }
                else if (response.data["status"] == "rated") {
                    alert("You have already rated that movie")
                }
                else if (response.data["status"] == "error") {
                    alert("asd")
                }
            },
            function(reason){
                console.log(reason);
            })
        }

        lv.prepForReview = function(rating) {
            lv.toReview = angular.copy(rating);
        }

        lv.reviewMovie = function() {
            $http.post("/movieReview/"+lv.toReview.idmovie, lv.review).then(function(response){
                if(response.data["status"] == "success") {
                    lv.ratings();
                    lv.review = {};
                    alert("You have succesfuly reviewed that movie!")
                }
                
            },
            function(reason){
                
                console.log(reason)
            });
        }

        lv.getReviews = function() {
            $http.get("/userReviews").then(function(response){
                lv.userReviews = response.data ;
            },
            function(reason){
                
                console.log(reason)
            });
        }

        lv.movieReviews = function() {
            $http.get("/movieReviews/"+$stateParams.idmovie).then(function(response){
                lv.movieReviews = response.data ;
            },
            function(reason){
                
                console.log(reason)
            });
        }
                

        lv.getMovie();
        lv.getActors();
        lv.fetchGenres();
        lv.ratings();
        lv.movieRating();
        lv.getReviews();
        lv.movieReviews();
    }]);
})(angular);