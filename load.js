var util = require("util");
var fs = require("fs");

var jsonPath = "./localdata/tasks/%s/metadata.json";
var mdPath = "./localdata/tasks/%s/description.md"
var indexJsonPath = "./localdata/index.json%s"

var database = {};
var index = JSON.parse(loadIndexJson().toString());


module.exports.all = loadAll
module.exports.database = loadDatabase
module.exports.indexJson = loadIndexJson
//module.exports.nameForId = loadNameForId


function loadDatabase() {
    return database;
}

function loadIndexJson() {
    var keys = loadAllKeys();
    var arr = [];
    keys.forEach(function (key) {
        arr[key] = index[key];
    });
    return arr;
}

function loadNameForId(unique_id) {
    return index[unique_id]["name"];
}

function getFileContents(pathToFile, key) {
    return fs.readFileSync(pathToFile);
}

function loadAllKeys() {
    var uniqueIds = Object.keys(index);
    return uniqueIds;
}

function loadAll() {
    var keys = loadAllKeys();
    keys.forEach(function (key) {
        var uniqueId = key;
        var name = index[key]["name"];
        var tuple = [loadJson(uniqueId, name),
                loadMarkdown(uniqueId, name)];
        database[uniqueId] = tuple;
    });
    return true;
}

function loadIndexJson() {
    var path = util.format(indexJsonPath, "");
    return getFileContents(path, "index");
}

function getPath(uniqueId, name) {
    return name.toLowerCase().replace(/ /g, "_")
        + "-" + uniqueId;
}

function loadJson(uniqueId, name) {
    var path = getPath(uniqueId, name);
    var full_path = util.format(jsonPath, path);
    return getFileContents(full_path, uniqueId);
}

function loadMarkdown(uniqueId, name) {
    var path = getPath(uniqueId, name);
    var full_path = util.format(mdPath, path);
    return getFileContents(full_path, uniqueId);
}