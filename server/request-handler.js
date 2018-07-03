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
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


var actions = {
  'GET': function() {
    //call response() with resObj, data from server, statuscode
  },
  'POST': function() {
    //call prepare() with reqObj, and cb(data) which saves data to database
    //call redirect() with resObj, path, statuscode
  }
};
  
  
  
var requestHandler = function(request, response) {

//determine if request method exists in actions
//if no, send404()
//if yes, call actions[request.method]
};


var response = function (res, data, status) {
  //set status code(es5 default 200);
  //call writehead(status, headers)
  //call end(data);
  
};

var send404 = function(res) {
  //call response with resObj, 'Not Found' for data, and 404 statuscode
};


console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
var statusCode = 200;
var headers = defaultCorsHeaders;
headers['Content-Type'] = 'text/plain';
response.writeHead(statusCode, headers);
response.end('Hello, World!');





module.exports.requestHandler = requestHandler;
