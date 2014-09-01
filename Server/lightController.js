var lightController = function (){

  var _lights = {
    "Basement": [
    {
      id: "1",
      level: 100
    },
    {
      id: "2",
      level: 0
    },
    {
      id: "3",
      level: 100
    },
    {
      id: "4",
      level: 0
    },
    {
      id: "5",
      level: 0
    },
    {
      id: "6",
      level: 0
    },
    {
      id: "7",
      level: 10
    },
    {
      id: "8",
      level: 0
    },
    {
      id: "9",
      level: 0
    },
    {
      id: "10",
      level: 0
    }
    ]

  }

  var self = this;


  function setLightLevel(light, level){
    light.level = level;
  }

  self.setLight = function(location, id, level){
    console.log('setting light ' + location + " " + id+ " " + level)

    for(var j=0; j < _lights[location].length; j++){
      if(id == _lights[location][j].id)
        {

          setLightLevel(_lights[location][j], level)
        }
      }
    };

    self.setLightAtIndex = function(location, index, level){
      console.log('setting light ' + location + " " + index+ " " + level)
      setLightLevel(_lights[location][index], level);
    };

    self.setAllLights = function (location, level){

      console.log('setting lights ' + location + " " + level)

      for(var j=0; j < _lights[location].length; j++){

        setLightLevel(_lights[location][j], level)

      }


    };

    self.getLights = function(){
      return _lights;
    };


  };

  module.exports = lightController;
