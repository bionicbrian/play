"use strict";

var express = require("express");
var app = module.exports = express();

app.get("/bimodal", function (req, res) {
    res.send("what is a bimodal?");
});
