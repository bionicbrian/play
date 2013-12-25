"use strict";

var express = require("express");
var stylus  = require("stylus");
var http    = require("http");
var path    = require("path");
var fs      = require("fs");
var app     = express();

// Projects
var dots = require("./projects/dots");

var dirContents = fs.readdirSync("./projects");
var projects = dirContents.filter(function (dir) {
    return dir[0] !== ".";
});

app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

app.use(express.favicon());
app.use(express.logger("dev"));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("teo and tinker"));
app.use(express.session());
app.use(app.router);

// Use project specific routes before stylus and static middleware
app.use(dots);

app.use(stylus.middleware(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));

if ("development" === app.get("env")) {
    app.use(express.errorHandler());
}

app.get("/", function (req, res) {
    res.render("index", { projects: projects });
});

http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
