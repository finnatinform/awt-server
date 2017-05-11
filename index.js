/* PACKAGES */
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
/* DATABASE */
var DataBase = new sqlite3.Database('./data/server.db');
/* SERVICES */
var UserService = require('./services/user-service');
var AdminService = require('./services/admin-service');

/* IMPLEMENTATION OF CALLS */
app.get('/:event/users/add', function ( _Request, _Response) {
    _Response.end(UserService.AddUser( DataBase, _Request.params.event));
})

app.get('/:event/users/list', function ( _Request, _Response) {
    _Response.end(UserService.ListUsers( DataBase, _Request.params.event));
})

app.get('/admin/database/build', function ( _Request, _Response) {
    _Response.end(AdminService.BuildDatabase( DataBase));
})

/* TEST */
// --

/* RUNNING SERVER */
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("awt-server listening at http://%s:%s", host, port)

// Wohin mit dem db.close();?
})