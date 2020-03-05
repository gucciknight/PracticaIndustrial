/**************************websocket_example.js*************************************************/
var bodyParser = require("body-parser");
const express = require('express'); //express framework to have a higher level of methods

const app = express(); //assign app variable the express class/method

var http = require('http');
var path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);//create a server

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}//***************this snippet gets the local ip of the node.js server. copy this ip to the client side code and add ':3000' *****
//****************exmpl. 192.168.56.1---> var sock =new WebSocket("ws://192.168.56.1:3000");*************************************
//var sock =new WebSocket("ws://192.168.0.11:3000");
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: ' + add);
});
/**********************websocket setup**************************************************************************************/
//var expressWs = require('express-ws')(app,server);
const WebSocket = require('ws');
const s = new WebSocket.Server({ server,
  deserializer: e => e.data
 });
//when browser sends get request, send html file to browser
// viewed at http://localhost:30000
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
//*************************************************************************************************************************
//***************************ws chat server********************************************************************************
//app.ws('/echo', function(ws, req) {
s.on('connection', function (ws, req) {
  /******* when server receives m,esssage from client trigger function with argument message *****/
   
  ws.on('message', function (message) {
    //let goodmessage = "[" + message + "]";
    //let utf8message = encode_utf8(goodmessage);
    //let json = JSON.stringify(utf8message);
    let jsonS = JSON.parse(e.data);
    //const output = jsonS.sensor;
    let newmessage = e.data;
    console.log("Received: " + newmessage);
    s.clients.forEach(function (client) { //broadcast incoming message to all clients (s.clients)
      if (client != ws && client.readyState) { //except to the same client (ws) that sent this message
        client.send("broadcast: " + message);
      }
    });
    // ws.send("From Server only to sender: "+ message); //send to client where message is from
  });
  ws.on('close', function () {
    console.log("lost one client");
  });
  //ws.send("new client connected");
  console.log("new client connected");
});
server.listen(3000);