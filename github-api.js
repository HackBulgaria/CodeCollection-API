var fetch = require("./fetch");
var filters = require("./filters");


module.exports.getJsons = getJsonsByTags;
module.exports.getMds = getMdsByUniqueIds;


function parseToArray(tags, cb, content) {
    var object = JSON.parse(content);
    var arr = [];
    var unique_ids = Object.keys(object);

    unique_ids.forEach(function (unique_id) {
        var obj = {};
        obj["unique_id"] = unique_id;
        obj["name"] = object[unique_id]["name"];
        obj["tags"] = object[unique_id]["tags"];
        arr.push(obj);
    });
    cb(arr);
}

function getUniqueNamesByTags(tags, cb) {
    fetch.indexjson(parseToArray.bind(undefined, tags,
        function (tasks) {
            cb(filters.byTags(tasks, tags));
        }));
}

function selectJsons(cb, filtered) {
    filtered.forEach(function (name) {
        fetch.json("", name, cb);
    });
}

function getJsonsByTags(tags, cb) {
    getUniqueNamesByTags(tags, selectJsons.bind(undefined, cb));
}

function getUniqueNameById(unique_id, cb) {
    fetch.indexjson(function (content) {
        var object = JSON.parse(content);
        cb(fetch.dirName(unique_id, object[unique_id]["name"]));
    });
}

function selectMds(cb, unique_name) {
        fetch.md("", unique_name, cb);
}

function getMdsByUniqueIds(unique_ids, cb) {
    getUniqueNameById(unique_ids, selectMds.bind(undefined, cb));
}


// some tests, let them here just for an example
//function print(content) {
//    console.log(content);
//}
//getJsonsByTags(["beginner", "for-loop"], print);

//getMdsByUniqueIds(["c37efda56e369d7e"], print);