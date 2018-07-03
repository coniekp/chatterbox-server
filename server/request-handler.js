/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'text/plain' // Seconds.
};

var storage = [{ username: 'kony', text: 'hi', roomname: 'lobby'}];
var objectIdCounter = 0;


var response = function (res, data, status) {
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
};

var actions = {
  'GET': function(res) {
    response(res, {results: storage}, 200);
  },

  'POST': function(req, res) {
    var accumulatedData = [];

    req.on('data', function(chunk) {
      accumulatedData.push(chunk);
    }).on('end', function() {
      
      accumulatedData = JSON.parse(Buffer.concat(accumulatedData).toString());
      
      accumulatedData.objectId = objectIdCounter;
      objectIdCounter++;
      storage.push(accumulatedData);
      
    });
    
    response(res, null, 201); 

  },
  'OPTIONS': function(req, res) {
    response(res, null, 200);
  }
};


var checkRequestMethod = function(req, res) {

  var hasValidURL = req.url === '/classes/messages';

  if (hasValidURL) {
    if (req.method === 'GET') {
      actions.GET(res);
    } else if (req.method === 'POST') {
      actions.POST(req, res);
    } else if (req.method === 'OPTIONS') {
      actions.OPTIONS(req, res);
    }
  } else {
    response(res, 'NOT FOUND', 404);
  }
};

var requestHandler = function(request, response) {
  //console.log('Serving request type ' + request.method + ' for url ' + request.url);
  checkRequestMethod (request, response);
};

module.exports.requestHandler = requestHandler;
