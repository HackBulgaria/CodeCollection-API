var fetch = require("./fetch");
var express = require("express");
var app = express();

app.set("jsonp callback", true)

function sendJson(res, content) {
    // res.send(content);
    // res.end();
    res.jsonp(content)
}

app.get("/tasks", function (req, res) {
    sendJson(res, fetch.allJsons());
});

app.get("/tasks/filter", function (req, res) {
    var tags = req.query["tag"];
    if (!Array.isArray(tags)) tags = [tags];
    sendJson(res, fetch.jsonsByTags(tags));
});

app.get("/tags", function (req, res) {
    sendJson(res, fetch.allTags());
});

app.listen(process.env.PORT || 3000);
