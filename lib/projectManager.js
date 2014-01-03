"use strict";

var fs = require("fs");

function projectManager(app, projectsDir) {
    var that     = {};
    var projects = [];
    var details  = [];

    var dirContents = fs.readdirSync(projectsDir);
    var projectDirs = dirContents.filter(function (dir) {
        return dir[0] !== "."; // remove hidden folders
    });

    projectDirs.forEach(function (projectDir) {
        var dir = projectsDir + "/" + projectDir;

        projects.push(require(dir));
        details.push(require(dir + "/details"));
    });

    that.load = function () {
        projects.forEach(function (project) {
            app.use(project);
        });
    };

    Object.defineProperty(that, "details", {
        value: details,
        enumerable: true
    });

    return that;
}

module.exports = projectManager;
