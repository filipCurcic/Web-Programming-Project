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
        lv.users = [];
        lv.sorted = "first_name";
        lv.reverseSort = false;
        lv.reverseMovieSort = false;
        lv.sortedMovie = "title";
        lv.clicked = 0;
        lv.zaIzmenu = {};
        lv.zaIzmenuBool = false;
        lv.loggedin = [];
        lv.film = {};
        lv.storedMovie = {};
        lv.storedActors = [];
        lv.header = true;
        lv.moviesactors = [];

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
        
        lv.saveToken = function() {
            $http.get("/loginAuth").then(function(response) {      
                var tempToken;
                tempToken = response.data;
                console.log(tempToken);
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.hideHeader = function() {
            lv.header = false;
            
        }
        

        lv.getStoredMovie = function() {
            lv.storedMovie = JSON.parse(localStorage.getItem("movie"));
            
        }
        lv.getStoredActors = function() {
            lv.storedActors = JSON.parse(localStorage.getItem("actors"));
            
        }

        lv.getMovie = function(idmovie) {
            $http.get("/filmovi/"+idmovie).then(function(response){
                lv.film = response.data;
                localStorage.setItem("movie", JSON.stringify(lv.film));
                
                window.location.replace('movieView.html');  
            },
            function(reason){
                console.log(reason)
            });
        };
        lv.dobaviGlumce = function(idmovie) {
            $http.get("/moviesActors/"+idmovie).then(function(response) {      
                lv.moviesactors = response.data;
                localStorage.setItem("actors", JSON.stringify(lv.moviesactors));
                
            }, function(reason) {
                console.log(reason);
            });
        }

        


        lv.checkLogin = function () {
            $http.post("/login", {"username": lv.username, "password": lv.password}).then(function (response) {
                lv.loggedin = response.data;
                console.log(lv.loggedin);
                lv.saveToken();
                alert("You have succefully logged in");
                window.location.replace('/');
                
                
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



        lv.getUsers = function() {
            $http.get("/users").then(function(response) {      
                lv.users = response.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        lv.getLoggedIn = function() {
            $http.get("/loggedIn").then(function(response) {      
                lv.loggedin = response.data;
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




        lv.ukloni = function(id) {
            $http.delete("/users/"+id).then(function(response){
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




        lv.ukloniFilm = function(idmovie) {
            $http.delete("/filmovi/"+idmovie).then(function(response){
                lv.dobaviFilmove();
            },
            function(reason){
                
                console.log(reason)
            });
        };



        lv.pripremiZaIzmenu = function(film) {
            lv.zaIzmenu = angular.copy(film);
            lv.zaIzmenuBool = true;
        }


        
        lv.izmeniFilm = function() {
            $http.put("/filmovi/"+lv.zaIzmenu.idmovie, lv.zaIzmenu).then(function(response){
                lv.dobaviFilmove();
                lv.zaIzmenu = {};
            },
            function(reason){
                
                console.log(reason)
            });
        };
        /*var modal = document.getElementById('myModal');
        var img = document.getElementById('myImg');
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            headerShow = false;
        }
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function() { 
            modal.style.display = "none";
            lv.header = true;
            alert(lv.header);
        }*/
        


        lv.dobaviRatings();
        lv.dobaviFilmove();
        lv.najPop();
        lv.dobaviLjude();
        lv.getDirectors();
        lv.getUsers();
        lv.getLoggedIn();
        lv.getStoredMovie();
        lv.getStoredActors();
        
    });
})(angular);