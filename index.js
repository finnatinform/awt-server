/* PACKAGES */
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
app.use(bodyParser());
/* DATABASE */
var DataBase = new sqlite3.Database('./data/server.db');
/* SERVICES */
var UserService = require('./services/user-service');
var DatabaseService = require('./services/database-service');
var EventService = require('./services/event-service');
var ReferentService = require('./services/referent-service');
var FairService = require('./services/fair-service');
var CompanyService = require('./services/company-service');

/* IMPLEMENTATION OF CALLS */
app.post('/events/add', function( _Request, _Response){
    var HResult = EventService.addEvent(DataBase, _Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/referents/add', function( _Request, _Response){
    ReferentService.addReferent(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/fairs/add', function( _Request, _Response){
    var HResult = FairService.addFair(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/companies/add', function( _Request, _Response){
    var HResult = CompanyService.addFair(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});

/* BUILD UP DATABASE */
DatabaseService.BuildDatabase(DataBase) ;

/* RUNNING SERVER */
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("awt-server listening at http://%s:%s", host, port)

// Wohin mit dem db.close();?
})