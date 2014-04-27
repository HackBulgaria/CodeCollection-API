var load = require("./load");
load.all();


var database = load.database();
var index = load.indexJson();


module.exports.allJsons = getFetchedJsons
module.exports.jsonsByTags = fetchJsonsByTags
module.exports.jsonsByIds = fetchJsonsByIds
module.exports.allTags = getFetchedTags


var fetchedJsons = fetchAllJsons();
var fetchedTags = fetchAllTags();


function getFetchedJsons() {
    return reformat(fetchedJsons);
}

function getFetchedTags() {
    return fetchedTags;
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

function reformat(jsons) {
    jsons.forEach(function (json) {
        var id = json["unique_id"];
        json["markdown"] = database[id][1].toString('base64');
    });
    return jsons;
}

function matchesId(ids, json) {
    return ids.indexOf(json["unique_id"]) > -1;
}

function fetchJsonsByIds(ids) {
    var filtered = fetchedJsons.filter(matchesId.bind(undefined, ids));;
    return reformat(filtered);
}

function fetchAllTags() {
    var tags = [];
    fetchedJsons.forEach(function (json) {
        json["tags"].forEach(function (tag) {
            if (tags.indexOf(tag) <= -1) {
                tags.push(tag);
            }
        });
    });
    return tags;
}