/**
 * Created by samciu on 16/6/11.
 */
var http = require('http');

// Create an HTTP tunneling proxy
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('okokokok!!!!!');
}).listen(1337,'127.0.0.1');