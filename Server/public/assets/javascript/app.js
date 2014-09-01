console.log("starting application");

var automationApp = angular.module('automationApp', ['ui.slider', 'ngRoute']);

automationApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/templates/basementlights.html'
        })
        .when('/movie', {
            templateUrl: '/templates/movie.html'
        })

});
