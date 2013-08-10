"use strict";

var express = require("express");
var app = module.exports = express();

app.set("views", __dirname);

app.get("/bimodal", function (req, res) {
    res.render("index");
});
