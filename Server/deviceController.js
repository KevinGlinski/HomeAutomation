var deviceController = function (){
  var self = this;
  self.performAction = function(device, action){
    console.log(device + ' - ' + action);
  };
};

module.exports = deviceController;
