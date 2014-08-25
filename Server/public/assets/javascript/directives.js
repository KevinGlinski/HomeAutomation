automationApp.directive('lightBulb', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/lightbulb.html',
    scope: true,
    controller: function($scope, $element){
      //console.log($scope.light);
    }
  };

});

automationApp.directive('lightingScene', function () {
  /*
  100%
  75%
  50%

  Movie
  Game

  */
  return {
    restrict: 'E',
    templateUrl: 'templates/lightbulb.html',
    scope: true,
    controller: function($scope, $element){
      $scope.awesomeVariable = "Awesome Content lives here!"
    }
  };

});
