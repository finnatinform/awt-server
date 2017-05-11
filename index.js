var express = require('express');
var app = express();

var UserService = require('./services/user-service');

app.get('/:event/users/add', function ( _Request, _Response) {
    _Response.end(UserService.AddUser(_Request.params.event));
})

app.get('/:event/users/list', function ( _Request, _Response) {
    _Response.end(UserService.ListUsers(_Request.params.event));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("awt-server listening at http://%s:%s", host, port)

})