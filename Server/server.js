//https://github.com/peter-murray/node-hue-api


// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var http = require('http');
var lightController = require('./lightController');
var lights = new lightController();

var sceneController = require('./sceneController');
var scenes = new sceneController();

var deviceController = require('./deviceController');
var devices = new deviceController();


scenes.setLights(lights);

// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(bodyParser());

var port = process.env.PORT || 8090; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.post('/device/action', function(req, res) {
  devices.performAction(req.body.device, req.body.action);
  res.json({});
});

router.get('/getlightstatus', function(req, res) {
  res.json(lights.getLights());
});


router.post('/setscene', function(req, res) {
  console.log(req.body);

  scenes.setScene(req.body.location, req.body.scene);

  res.json({});
});

router.post('/setalllights', function(req, res) {
  lights.setAllLights(req.body.location, req.body.level);
  res.json({});
});

router.post('/setlight', function(req, res) {
  lights.setLight(req.body.location, req.body.id, req.body.level);
  res.json({});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use(express.static(__dirname + '/public'));

// START THE SERVER
// =============================================================================
app.listen(port,"0.0.0.0");
console.log('Magic happens on port ' + port);

//var connect = require('connect');
//var serveStatic = require('serve-static');
//connect().use(serveStatic('public')).listen(8080,"0.0.0.0");
