var sceneController = function (){

  var self = this;
  var lightController = null;

  self.setLights = function(lights){
    lightController = lights
  };

  self.setScene = function (location, newScene){

    //res.json(_lights);
    //var fileJSON = require('/public/scenes.json');
    fs = require('fs');
    fs.readFile('./public/scenes.json', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }

      var scenes = JSON.parse(data);

      console.log('setting scene ' + location + " " + newScene)

      var locationScenes = scenes[location];
      console.log('locationScenes');
      console.log(locationScenes);

      if (locationScenes == null) return;

        for(var i=0; i < locationScenes.length; i++){
          if(locationScenes[i].name == newScene){
            var scene = locationScenes[i].levels;
            console.log("setting lights");
            for(var j=0; j < scene.length; j++){
              lightController.setLightAtIndex(location,j, scene[j] );
            }
          }
        }

      });
    };



  };

  module.exports = sceneController;
