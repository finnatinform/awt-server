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

/* IMPLEMENTATION OF CALLS */
app.post('/users/add', function( _Request, _Response){
    console.log(_Request.body);
    _Response.end(_Request.body.key);
});

app.get('/events', function( _Request, _Response){
    var HResult = [] ;
    HResult.push(
        {
            IDENT: 1001 ,
            CAPTION: "How to Work with FELIOS" ,
            PLACE: "Saal Bruessel",
            DESCRIPTION: "Lorem Ipsum Dorem 123",
            START_DATE: "16/05/2017-21:36:00"
        }
    );
        HResult.push(
        {
            IDENT: 1001 ,
            CAPTION: "How to Work with SPE" ,
            PLACE: "Saal Berlin",
            DESCRIPTION: "Lorem Ipsum Dorem 123",
            START_DATE: "16/05/2017-21:36:00"
        }
    );
    _Response.end(JSON.stringify(HResult));
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