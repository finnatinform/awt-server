/* PACKAGES */
var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require("fs");

app.use(fileUpload());
app.use(bodyParser());
app.use(cors());
app.use( express.static(__dirname+'/data/avatars') );

/* DATABASE */
var DataBase = new sqlite3.Database('./data/server.db');
/* SERVICES */
var UserService = require('./services/tables/user-service');
var DatabaseService = require('./services/data/database-service');
var EventService = require('./services/tables/event-service');
var ReferentService = require('./services/tables/referent-service');
var CompanyService = require('./services/tables/company-service');
var PushService = require('./services/tables/notification-service');

/* IMPLEMENTATION OF CALLS */
app.post('/companies/add', function( _Request, _Response){
    console.log(_Request.body);
    CompanyService.addCompany(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/companies/change', function( _Request, _Response){
    console.log(_Request.body);
    CompanyService.changeCompany(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.delete('/companies/delete', function( _Request, _Response){
    console.log(_Request.body);
    CompanyService.deleteCompany(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/notifications/add', function( _Request, _Response){
    PushService.addNotification(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/notifications/change', function( _Request, _Response){
    PushService.changeNotification(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.delete('/notifications/delete', function( _Request, _Response){
    console.log('deleteNotification');
    PushService.deleteNotification(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});

app.post('/events/add', function( _Request, _Response){
    console.log(_Request.body);
    EventService.addEvent(DataBase, _Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/events/change', function( _Request, _Response){
    EventService.changeEvent(DataBase, _Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.delete('/events/delete', function( _Request, _Response){
    console.log('deleteEvent');
    EventService.deleteEvent(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});

app.get('/events/list', function ( _Request, _Response) {
    EventService.listEvents(DataBase,function( _Error, _Result ){
        var HResult = "" ;
        if( _Error ){
            HResult = "error";
        } else {
            HResult = JSON.stringify(_Result);
        }
        _Response.end(HResult);
    });
});

app.post('/events/listuserevents', function( _Request, _Response){
    EventService.listEventsForUser(DataBase, _Request.body, function( _Error, _Result ){
        var HResult = "" ;
        if( _Error ){
            HResult = "error";
        } else {
            HResult = JSON.stringify(_Result);
        }
        _Response.end(HResult);
    });
});

app.post('/events/reserve', function ( _Request, _Response) {
    EventService.reserveEvent(DataBase, _Request.body, function(_Success){
        _Response.end(_Success);
    });
});

app.post('/referents/add', function( _Request, _Response){
    console.log(_Request.body);
    ReferentService.addReferent(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/referents/change', function( _Request, _Response){
    ReferentService.changeReferent(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.post('/users/add', function( _Request, _Response){
    console.log('user added');
    UserService.addUser(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
app.get('/referents/list', function ( _Request, _Response) {
    console.log('listReferents');
    ReferentService.listAllReferents(DataBase,function( _Error, _Result ){
        var HResult = "" ;
        if( _Error ){
            HResult = "error";
        } else {
            HResult = JSON.stringify(_Result);
        }
        _Response.end(HResult);
    });
});

app.get('/companies/list', function ( _Request, _Response) {
    CompanyService.listCompanies(DataBase,function( _Error, _Result ){
        var HResult = "" ;
        if( _Error ){
            HResult = "error";
        } else {
            HResult = JSON.stringify(_Result);
        }
        _Response.end(HResult);
    });
});


app.post('/companies/check', function( _Request, _Response){
    console.log('check key: '+_Request.body.UNLOCK_KEY);
    CompanyService.checkCompany(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});


app.get('/notifications/list', function ( _Request, _Response) {
    PushService.listAllNotifications(DataBase,function( _Error, _Result ){
        var HResult = "" ;
        if( _Error ){
            HResult = "error";
        } else {
            HResult = JSON.stringify(_Result);
        }
        _Response.end(HResult);
    });
});
app.delete('/referents/delete', function( _Request, _Response){
    ReferentService.deleteReferent(DataBase,_Request.body, function(_Success){
        _Response.end(_Success);
    });
});
/* BUILD UP DATABASE */
DatabaseService.BuildDatabase(DataBase) ;

/* RUNNING SERVER */
var server = app.listen(9000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("awt-server listening at http://%s:%s", host, port)

// Wohin mit dem db.close();?
});