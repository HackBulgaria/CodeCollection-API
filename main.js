var gapi = require("./github-api");
var express = require("express");
var app = express();


function sendJson(res, content) {
    console.log(content);
    res.send(content);
}

function getAll() {
    app.get("/tasks", function (req, res) {

    });
}

function getByTags() {
    app.get("/tasks", function (req, res) {
        var tags = req.query["tag"];
        if (!Array.isArray(tags)) tags = [tags];

        gapi.getJsons(tags, sendJson.bind(undefined, res));
    });
}

getByTags();
app.listen(3000);