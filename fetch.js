var util = require("util");

var github = require("octonode");
var token = "4c9c5dd10e5d829762770125684cb992af3479de";
var client = github.client(token);
var ghrepo = client.repo("HackBulgaria/CodeCollection");

var jsonPath = "tasks/%s/metadata.json";
var mdPath = "tasks/%s/description.md"
var indexPath = "index.json%s"

module.exports.indexjson = fetchIndex
module.exports.json = fetchJson
module.exports.md = fetchMd
module.exports.dirName = makeDirName

function fetchFile(uniqueId, name, cb, filePath) {
    var dirName = makeDirName(uniqueId, name);
    var path = util.format(filePath, dirName);
    var content;

    ghrepo.contents(path, function(req, res) {
        content = new Buffer(res.content, 'base64').toString('ascii');
        cb(content);
    });
}

function makeDirName(uniqueId, name) {
    if (uniqueId == "" && name == "") return "";
    if (uniqueId == "") return name;
    return name.toLowerCase().replace(/ /g, "_") + "-" + uniqueId;
}

function fetchIndex(cb) {
    fetchFile("", "", cb, indexPath);
}

function fetchJson(uniqueId, name, cb) {
    fetchFile(uniqueId, name, cb, jsonPath);
}

function fetchMd(uniqueId, name, cb) {
    fetchFile(uniqueId, name, cb, mdPath);
}