
automationApp.factory('sceneService', function($http){
  var sceneData = null;
  var emptyScene=[];

  function loadScenes(){

    $http({method: 'GET', url: '/scenes.json'}).
    success(function(data, status, headers, config) {
      sceneData = data;
      console.log(sceneData);
    })
  }

  loadScenes();

  function getScenes(location) {
    if (sceneData == null) return emptyScene;
      return sceneData[location];
    }

    function setScene(location, scene){
      var data = {"location": location,
      "scene": scene};

      $http.post('/api/setscene', data);
    }

    return{
      getScenes : getScenes,
      setScene : setScene
    }

  });


  automationApp.factory('lightService', function($http, $interval){
    var lightData = null;
    var emptyScene=[];


    function pollLightStatus(){
      $http({method: 'GET', url: '/api/getlightstatus'}).
      success(function(data, status, headers, config) {
        lightData = data;
      });
    }

    pollLightStatus();
    $interval(pollLightStatus, 1000);

    function getLights(location)
    {
      if (lightData == null)
        {
          return emptyScene
        }

        return lightData[location];
      }

      function setAllLights(location, level){
        $http.post('/api/setalllights', {"location": location, "level":level});
      }

      function setLight(location, id, level)
      {
        $http.post('/api/setlight', {"location": location, "level":level, "id": id});
      }

      return{
        getLights : getLights,
        setAllLights : setAllLights,
        setLight : setLight
      }

    });

    automationApp.factory('deviceService', function($http){

      function dvdpause()
      {
        callaction("dvd", "pause");
      }

      function dvdplay()
      {
        callaction("dvd", "play");
      }

      function volumeup()
      {
        callaction("amp", "volume up");
      }

      function volumedown()
      {
        callaction("amp", "volume down");
      }

      function callaction(device, action){
        $http.post('/api/device/action', {"device": device, "action":action});
      }

      return{
        volumedown : volumedown,
        volumeup : volumeup,
        dvdplay : dvdplay,
        dvdpause:dvdpause
      }

    });
