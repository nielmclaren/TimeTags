const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

exports.handler = async event => {
  const path = event.context["resource-path"];
  if (isEntriesPath(path)) {
    return handleEntries(event);
  }
  return handleDefault(event);
};

function isEntriesPath(path) {
  return path.match(/^\/entries/);
}

function handleEntries(event) {
  switch (event.context["http-method"]) {
    case "GET":
      return handleEntriesGet(event);
    case "PUT":
      return handleEntriesPut(event);
    default:
      return handleDefault();
  }
}

function handleEntriesGet(event) {
  const entryDate = getEntryDate(event);
  const params = {
    TableName: "TimeTagsEntries",
    Key: {
      EntryDate: { S: entryDate },
    },
    ProjectionExpression: "EntryDate, EntryText",
  };

  ddb.getItem(params, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
    }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify("Here are your entries!"),
  };

  return response;
}

function getEntryDate(event) {
  const path = event.context["resource-path"];
  const matches = path.match(/^\/entries\/(\d{4}-\d{2}-\d{2})/);
  if (!matches) {
    throw new Error(`Bad request: ${event.context["http-method"]} ${event.context["resource-path"]}`);
  }
  return matches[1];
}

function handleEntriesPut(event) {
  const { entryDate, entryText } = JSON.parse(event.context["body-json"]);

  if (entryDate === undefined) {
    throw new Error("entryDate parameter is required.");
  }
  if (entryText === undefined) {
    throw new Error("entryText parameter is required.");
  }

  const params = {
    TableName: "TimeTagsEntries",
    Item: { EntryDate: { S: entryDate }, EntryText: { S: entryText } },
  };

  console.log("Putting item", params);
  ddb.putItem(params, (error, data) => {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Success", data);
    }
  });
}

function handleDefault(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify(`I don't ${event.context["http-method"]} you.`),
  };
  return response;
}
