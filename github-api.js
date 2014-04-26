var fetch = require("./fetch");
var filters = require("./filters");


function parseToArray(tags, cb, content) {
    var object = JSON.parse(content);
    var arr = new Array;
    var unique_ids = Object.keys(object);

    unique_ids.forEach(function (unique_id) {
        arr["unique_id"] = unique_id;
        arr["name"] = object[unique_id]["name"];
        arr["tags"] = object[unique_id]["tags"];
    });
    cb(arr);
}

function getJsonsByTags(tags, cb) {
    fetch.indexjs(parseToArray.bind(undefined, tags,
        function (tasks) {
            cb(filters.byTags(tasks, tags));
        }));
}

getJsonsByTags([], function testPrinter(filtered) {
    console.log(filtered);
});