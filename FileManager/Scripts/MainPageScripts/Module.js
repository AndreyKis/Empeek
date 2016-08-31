var app;
(function () {
    app = angular.module("APIModule", ["ngRoute"]);
})();

app.config(function appConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

// Initialize the application
app.run(['$location', function appRun($location) {
    //if (typeof ($location.search().path) == "undefined")
        //$location.path("Home");
    //debugger; // -->> here i debug the $location object to see what angular see's as URL
}]);