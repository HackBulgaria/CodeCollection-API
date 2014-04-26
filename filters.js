var fetch = require("./fetch");
module.exports.byTags = filterByTags


function filterByTags(tasks, tags) {
    function containsTag(task, tag) {
        return task["tags"].indexOf(tag) > -1;
    }

    function containsAllTags(task) {
        return tags.every(containsTag.bind(undefined, task));
    }
    return tasks.filter(containsAllTags).map(function (obj) {
        return fetch.dirName(obj["unique_id"], obj["name"]);
    });
}