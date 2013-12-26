"use strict";

var path    = require("path");
var stylus  = require("stylus");
var express = require("express");
var app     = express();

app.set("views", __dirname + "/views");
app.use(stylus.middleware(__dirname + "/public"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/dots", function (req, res) {
    res.render("index", { projectName: "Dots" });
});

module.exports = app;
