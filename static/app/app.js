(function(angular) {

    var app = angular.module('Aplikacija', ['ui.router', 'loginService']);

    app.config(['$stateProvider', function($stateProvider) {
        $stateProvider.state({
            name: 'home',
            url: '',
            templateUrl: 'app/movies/movies.html',
            controller: 'moviesCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'mostPopular',
            url: '/mostPopular',
            templateUrl: 'app/movies/mostPopular.html',
            controller: 'moviesCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'topRated',
            url: '/topRated',
            templateUrl: 'app/movies/topRated.html',
            controller: 'moviesCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'viewMovies',
            url: '/viewMovies',
            templateUrl: 'app/admin_services/viewMovies.html',
            controller: 'adminCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'viewUsers',
            url: '/viewUsers',
            templateUrl: 'app/admin_services/viewUsers.html',
            controller: 'adminCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'addMovie',
            url: '/addMovie',
            templateUrl: 'app/admin_services/addMovie.html',
            controller: 'adminCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'register',
            url: '/register',
            templateUrl: 'app/user_services/register.html',
            controller: 'userCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'movie',
            url: '/movie/{idmovie}',
            templateUrl: 'app/movie/movie.html',
            controller: 'movieCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'login',
            url: '/login',
            templateUrl: 'app/user_login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'moviesByGenre',
            url: '/moviesByGenre/{idgenre}',
            templateUrl: 'app/movies/moviesByGenre.html',
            controller: 'moviesCtrl',
            controllerAs: 'lv'
        }).state({
            name: 'moviesByDirector',
            url: '/moviesByDirector/{idperson}',
            templateUrl: 'app/movies/directedBy.html',
            controller: 'moviesCtrl',
            controllerAs: 'lv'
        })
    }]);
})(angular);