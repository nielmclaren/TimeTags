const index = require("./index");

/*
// PUT
index.handler({
  context: {
    "resource-path": "/entries",
    "http-method": "PUT",
    "body-json": '{ "entryDate": "2019-11-23", "entryText": "Today was awesome!" }',
  },
});
/*/
// GET
index.handler({
  context: {
    "resource-path": "/entries/2019-11-23",
    "http-method": "GET",
  },
});
//*/
