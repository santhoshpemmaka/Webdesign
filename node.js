1.Non-blocking code using node.js
----------------------------------------------------------

var fs = require("fs");

fs.readFile('/etc/hosts',function(err,contents){
  
 console.log(contents);

});

console.log('Doing something else');

2 Http request using node.js
----------------------------------------------------

var http = require('http');

http.createServer(function(request,response){

 response.writeHead(200);
 response.write("Hello,this is Sah");
 response.end();
}).listen(8080);

console.log('Listening on port 8080');

** Run the server type below command:-
      $ node hello.js

3.SetTimeout code using node.js
------------------------------------------------------

var http = require('http');


http.createServer(function(request,respond){ ------>request function

respond.writeHead(200);
respond.write("Hello to sah");
setTimeout(function(){      ---------------> Timeout function
  respond.write("sah is receive");
  respond.end();
  },5000);
}).listen(8080);
console.log("server running right now");

3.Events in node.js
------------------------------------------------------------------
var EventEmitter = require('events').EventEmitter;

**Create new variable**

var logger = new EventEmitter();

logger.on('error',function(message){
  
  console.log('ERR:'+message);
});

logger.emit('error','Santhosh');

logger.emit('error', 'Sah');

4.How to read from the request.
------------------------------------------------------------------

http.createServer(function(request,response){
  response.writeHead(200);
  request.on('data',function(chunk){
   response.write(chunk);
  });

  request.on('end',function(){
   response.end();
  });
}).listen(8080);

** In other read form of the request **

http.createServer(function(request,response){

 response.writeHead(200);
 request.pipe(response);
}).listen(8080);

5. Reading and writing a file
--------------------------------------------------------

var fs = require('fs');

var file = fs.createReadStream("readme.md");
var newfile = fs.createWriteStream("readme_copy.md");

file.pipe(newfile);

6.Upload a file
------------------------------------------------------
var fs = require("fs");
var http = require('http');

http.createServer(function(request,response){

 var newFile = fs.createWriteStream("readme.md");
 request.pipe(newfile);

 request.on('end',function(){
  response.end('uploaded!');
 });
}).listen(8080);


























































