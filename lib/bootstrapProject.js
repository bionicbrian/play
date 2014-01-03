"use strict";

var path    = require("path");
var stylus  = require("stylus");
var express = require("express");

function bootstrapProject(dirName, project) {
    var app = express();

    app.set("views", dirName + "/views");
    app.use(stylus.middleware(dirName + "/public"));
    app.use(express.static(path.join(dirName, "public")));

    app.get("/" + project.route, function (req, res) {
        res.render("index", { projectName: project.title });
    });

    return app;
}

module.exports = bootstrapProject;
