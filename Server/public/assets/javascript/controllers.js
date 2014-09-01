automationApp.controller('BasementLightController', function ($scope, $element, sceneService, lightService) {
  $scope.scenes = null;

  $scope.$watch(function () { return sceneService.getScenes("Basement") }, function (newVal, oldVal) {
    if (typeof newVal !== 'undefined') {
      $scope.scenes = sceneService.getScenes("Basement");
    }
  });

  $scope.$watch(function () { return lightService.getLights("Basement") }, function (newVal, oldVal) {
    if (typeof newVal !== 'undefined') {
      $scope.lights = lightService.getLights("Basement");
    }
  });

  $scope.areLightsOn = function(){
    if ($scope.lights ==null) return false;


    for(var i=0; i< $scope.lights.length; i++){
      if($scope.lights[i].level > 0){
        return true;
      }
    }

    return false;
  };

  $scope.setScene = function(scene){
    sceneService.setScene("Basement", scene)
  }

  $scope.toggleLight = function(id){

    var newValue = 0;

    for(var i=0; i< $scope.lights.length; i++){
      if($scope.lights[i].id == id && $scope.lights[i].level === 0){
        newValue = 90;
      }
    }

    lightService.setLight("Basement", id, newValue);
  }

  var overallLevelCount = 0;
  $scope.overallLevel = 50;

  $scope.$watch('overallLevel', function(newValue, oldValue) {
    overallLevelCount++; //HACK to make sure not to change the light values on page load
    if (overallLevelCount <= 2){ return;}

      var lightIds = [];
      for(var i=0; i< $scope.lights.length; i++){
        lightIds.push($scope.lights[i].id);
      }

      setLights(lightIds, newValue);

    });


    $scope.$watch('lights', function(newValue, oldValue) {
      var sum = 0;
      for(var i=0; i< newValue.length; i++){
        if(newValue[i].level > 0){
          sum += newValue[i].level;
        }
      }

      var value = 0;
      if(sum > 0){
        value = sum / newValue.length;
      }

      $scope.overallLevel = value;
      isInit = true;
      overallLevelCount = 0;
    });

    $scope.toggleAllLights = function () {
      var value = $scope.areLightsOn() ? 0 : 100;

      lightService.setAllLights("Basement", value);
    }




    });

    automationApp.controller('AppController', function ($scope, $element, sceneService, lightService) {

});

automationApp.controller('MovieController', function ($scope, $element, deviceService, sceneService, lightService) {
  $scope.play = function(){
    deviceService.dvdplay();
    sceneService.setScene("Basement", "Low Light");
  }

  $scope.pause = function(){
    deviceService.dvdpause();
    sceneService.setScene("Basement", "Movie Pause");
  }

  $scope.volumeup = function(){
    deviceService.volumeup();
  }

  $scope.volumedown = function(){
    deviceService.volumedown();
  }

  $scope.setMovieScene = function(){
    sceneService.setScene("Basement", "Low Light");
  }
  $scope.setLightsUp = function(){
    sceneService.setScene("Basement", "Movie Pause");
  }
});
