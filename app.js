"use strict";

var express = require("express");
var stylus  = require("stylus");
var http    = require("http");
var path    = require("path");
var fs      = require("fs");
var app     = express();

// Projects
var dirContents = fs.readdirSync("./projects");
var projectNames = dirContents.filter(function (dir) {
    return dir[0] !== ".";
});
var projectsMap = {};
projectNames.forEach(function (projectName) {
    projectsMap[projectName] = require("./projects/" + projectName);
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
projectNames.forEach(function (projectName) {
    app.use(projectsMap[projectName]);
});

app.use(stylus.middleware(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));

if (app.get("env") === "development") {
    app.use(express.errorHandler());
}

app.get("/", function (req, res) {
    res.render("index", { projects: projectNames });
});

http.createServer(app).listen(app.get("port"), function () {
    console.log("Express server listening on port " + app.get("port"));
});
