"use strict";

var express = require("express");
var http    = require("http");
var path    = require("path");
var fs      = require("fs");
var app     = express();

var bimodal = require("./lib/bimodal");
var projects = fs.readdirSync("./lib");

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(bimodal);

app.get("/", function (req, res) {
    res.render("index", { hideNav: true, projects: projects });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
