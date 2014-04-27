CodeCollection-API
==================

##The API for selecting and filtering the Code Collection repository

###How to use the CodeCollection-API

* making a request to `/tags` will respond with all present tasks tags
* making a request to `/tasks` will respond with all present tasks in json format
* making a request to `/tasks/filter?tag=<tag1>&tag=<tag2>...&tag=<tagn>`<br>
will respond with all tasks containing `<tag1>` to `<tagn>` in json format

###The jsons have:
* `name` - the name of a task
* `tags` - the tags of a task
* `unique_id` - the id corresponding to a task
* `short_description` - a short description of a task
* `markdown` - the full description of a task in base64 format