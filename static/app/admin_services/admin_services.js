(function (angular) {
    var app = angular.module('Aplikacija');
    app.controller('adminCtrl', ['$http', function($http) {
        var lv = this;
        lv.movies = [];
        lv.sorted = "first_name";
        lv.reverseSort = false;
        lv.reverseMovieSort = false;
        lv.sortedMovie = "title";
        lv.actors = [];
        lv.directors = [];
        lv.genres = [];


        lv.newMovie = {
            "title": "",
            "desc": "",
            "runtime": "",
            "release": "",
            "actor": undefined,
            "actor.person_idperson": "",
            "director": undefined,
            "director.person_idperson": "",
            "genre": undefined,
            "genre.idgenre": ""
            
        };

        lv.newPerson = {
            "first_name": "",
            "last_name": "",
            "gender": "",
            "date_of_birth": "",
            "person_type": ""
        }

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
        lv.addMovie = function() {
            
            lv.newMovie["actor.person_idperson"] = lv.newMovie["actor"]["person_idperson"];
            lv.newMovie["director.person_idperson"] = lv.newMovie["director"]["person_idperson"];
            lv.newMovie["genre.idgenre"] = lv.newMovie["genre"]["idgenre"];

            $http.post("/movies", lv.newMovie).then(function(response){

                if(response.data["status"] == "done") {
                    lv.fetchMovies();
                    alert("You have successfully added a movie")
                    location.reload();
                }
            },
            function(reason){
                console.log(reason);
            })
        };

        lv.addPerson = function() {
            $http.post("/people", lv.newPerson).then(function(response){
                if(response.data["status"] == "done") {
                    lv.getUsers();
                    alert("You have successfully aded an actor/director")
                    location.reload();
                }
            },
            function(reason){
                console.log(reason);
            })
        };


        lv.getUsers = function() {
            $http.get("/users").then(function(response) {      
                lv.users = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        
        lv.sortUsers = function(sortParameter) {
                lv.reverseSort = (lv.sorted == sortParameter) ? !lv.reverseSort : false;
                lv.sorted = sortParameter;
        }



        lv.getSortClass = function(sortParameter) {
            if(lv.sorted == sortParameter) {
                return lv.reverseSort ? 'arrow-down' : 'arrow-up'
            }
            return '';
        }

        lv.removeUser = function(id) {
            $http.delete("/users/"+id).then(function(response){
                lv.getUsers();
            },
            function(reason){
                
                console.log(reason)
            });
        };
        lv.promoteUser = function(id) {
            $http.put("/users/"+id).then(function(response){
                lv.getUsers();
            },
            function(reason){
                
                console.log(reason)
            });
        };

        lv.sortMovies = function(sortParameter) {
            lv.reverseMovieSort = (lv.sortedMovie == sortParameter) ? !lv.reverseMovieSort : false;
            lv.sortedMovie = sortParameter;
        }



        lv.getMovieSortClass = function(sortParameter) {
            if(lv.sosortedMovierted == sortParameter) {
                return lv.reverseMovieSort ? 'arrow-down' : 'arrow-up'
            }
            return '';
        }

        lv.removeMovie = function(idmovie) {
            $http.delete("/movies/"+idmovie).then(function(response){
                lv.fetchMovies();
            },
            function(reason){
                
                console.log(reason)
            });
        };



        lv.prepForEdit = function(film) {
            lv.zaIzmenu = angular.copy(film);
            lv.zaIzmenuBool = true;
        }

        lv.cancelEdit = function() {
            lv.zaIzmenuBool = false;
        }


        
        lv.editMovie = function() {
            $http.put("/movies/"+lv.zaIzmenu.idmovie, lv.zaIzmenu).then(function(response){
                lv.fetchMovies();
                lv.zaIzmenu = {};
                alert("You have succesfuly edited that movie!")
                lv.zaIzmenuBool = false;
            },
            function(reason){
                
                console.log(reason)
            });
        };
        lv.getActors = function() {
            $http.get("/actors").then(function(response) {      
                lv.actors = response.data;
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
        lv.fetchGenres = function() {
            $http.get("/Genres").then(function(response) {      
                lv.genres = response.data;
                
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.fetchMovies();
        lv.getUsers();
        lv.getActors();
        lv.getDirectors();
        lv.fetchGenres();
    }]);
})(angular);