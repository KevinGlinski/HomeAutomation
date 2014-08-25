//https://github.com/peter-murray/node-hue-api


// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var http = require('http');



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

router.get('/getlightstatus', function(req, res) {

  res.json(_lights);
});

openLightConnections = [];
// simple route to register the clients
app.get('/sse/lights', function(req, res) {

  // set timeout as high as possible
  req.socket.setTimeout(Infinity);

  // send headers for event-stream connection
  // see spec for more information
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write('\n');

  // push this res object to our global variable
  openLightConnections.push(res);

  // When the request is closed, e.g. the browser window
  // is closed. We search through the open connections
  // array and remove this connection.
  req.on("close", function() {
    var toRemove;
    for (var j =0 ; j < openLightConnections.length ; j++) {
      if (openLightConnections[j] == res) {
        toRemove =j;
        break;
      }
    }
    openLightConnections.splice(j,1);
    console.log(openLightConnections.length);
  });
});


function setLight(light, level){

  light.level = level;

}

router.post('/setscene', function(req, res) {

  //res.json(_lights);
  //var fileJSON = require('/public/scenes.json');
  fs = require('fs')
  fs.readFile('./public/scenes.json', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

    var scenes = JSON.parse(data);

    console.log('setting scene ' + req.body.location + " " + req.body.scene)

    var locationScenes = scenes[req.body.location];
    console.log('locationScenes');
    console.log(locationScenes);

    if (locationScenes == null) return;

      for(var i=0; i < locationScenes.length; i++){
        if(locationScenes[i].name == req.body.scene){
          var scene = locationScenes[i].levels;
          console.log("setting lights");
          for(var j=0; j < _lights[req.body.location].length; j++){

            setLight(_lights[req.body.location][j], scene[j])
          }
        }
      }

    });


    res.json({});
  });

  router.post('/setalllights', function(req, res) {

    console.log('setting lights ' + req.body.location + " " + req.body.level)

    for(var j=0; j < _lights[req.body.location].length; j++){

      setLight(_lights[req.body.location][j], req.body.level)
    }


    res.json({});
  });

  router.post('/setlight', function(req, res) {

    console.log('setting light ' + req.body.location + " " + req.body.id+ " " + req.body.level)

    for(var j=0; j < _lights[req.body.location].length; j++){
      if(req.body.id == _lights[req.body.location][j].id)
        {

          setLight(_lights[req.body.location][j], req.body.level)
        }
      }


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
