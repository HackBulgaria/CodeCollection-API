var load = require("./load");
load.all();


var database = load.database();
var index = load.indexJson();

module.exports.allJsons = getFetchedJsons
module.exports.jsonsByTags = fetchJsonsByTags
module.exports.jsonsByIds = fetchJsonsByIds


var fetchedJsons = fetchAllJsons();


function getFetchedJsons() {
    return reformat(fetchedJsons);
}

function fetchAllJsons() {
    var uniqueIds = Object.keys(database);
    var arr = [];
    uniqueIds.forEach(function (uniqueId) {
        var json = database[uniqueId][0].toString();
        arr.push(JSON.parse(json));
    });
    return arr;
}

function containsTag(object, tag) {
    return object["tags"].indexOf(tag) > -1;
}

function containsTags(tags, object) {
    return tags.every(containsTag.bind(undefined, object));
}

function fetchJsonsByTags(tags) {
    var filtered = fetchedJsons.filter(containsTags.bind(undefined, tags));
    return reformat(filtered);
}

function reformat(filtered) {
    filtered.forEach(function (json) {
        var id = json["unique_id"];
        json["markdown"] = database[id][1].toString('base64');
    });
    return filtered;
}

function matchesId(ids, json) {
    return ids.indexOf(json["unique_id"]) > -1;
}

function fetchJsonsByIds(ids) {
    var filtered = fetchedJsons.filter(matchesId.bind(undefined, ids));;
    return reformat(filtered);
}