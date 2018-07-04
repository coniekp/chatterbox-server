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
var youAreEl = require('url');
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'text/plain' // Seconds.
};
var createdAt = Date.now();
var storage = [
  { username: 'Kony', text: 'Hi Russ!', roomname: 'Cool Kid\'s Hangout', createdAt: 1530666762153, objectId: 0}, 
  { username: 'Russ', text: 'Hi Kony!', roomname: 'Cool Kid\'s Hangout', createdAt: 1530666726460, objectId: 1}
];
var objectIdCounter = 2;


var response = function (res, data, status) {
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
};

var sort = function (arr, sortBy) {
  
  var order = sortBy[0];
  var attribute = order === '-' ? sortBy.slice(1) : sortBy;
  var sorted = arr.sort(function (a, b) {
    if (a[attribute] < b[attribute]) {
      return -1;
    } 
    if (a[attribute] > b[attribute]) {
      return 1;
    }
    return 0;
  });
  return order !== '-' ? sorted : sorted.reverse();
};

var actions = {
  'GET': function(req, res) {
    var qwaerry = youAreEl.parse(req.url, true).query.order;
    if (qwaerry) {
      sort(storage, qwaerry);
    }
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

      accumulatedData.createdAt = Date.now();

      storage.push(accumulatedData);
      
    });
    
    response(res, null, 201); 

  },
  'OPTIONS': function(req, res) {
    response(res, null, 200);
  }
};


var checkRequestMethod = function(req, res) {

  var hasValidURL = req.url.match('/classes/messages');

  if (hasValidURL) {
    if (req.method === 'GET') {
      actions.GET(req, res);
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
