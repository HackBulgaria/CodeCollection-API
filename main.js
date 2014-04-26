var fetch = require("./fetch");
var express = require("express");
var app = express();


function sendJson(res, content) {
    res.send(content);
}

function getAll() {
    app.get("/tasks", function (req, res) {
        sendJson(res, fetch.allJsons());
        console.log(fetch.allJsons())
    });
}

function getByTags() {
    app.get("/tasks", function (req, res) {
        var tags = req.query["tag"];
        if (!Array.isArray(tags)) tags = [tags];
        sendJson(res, fetch.jsonsByTags(tags));
    });
}

getAll();

app.listen(3000);