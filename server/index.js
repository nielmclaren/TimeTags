exports.handler = async event => {
  switch (event.context["resource-path"]) {
    case "/entries":
      return handleEntries(event);
    default:
      return handleDefault(event);
  }
};

function handleEntries(event) {
  switch (event.context["http-method"]) {
    case "GET":
      return handleEntriesGet(event);
    default:
      return handleDefault();
  }
}

function handleEntriesGet(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Here are your entries!"),
  };
  return response;
}

function handleDefault(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify(`I don't ${event.context["http-method"]} you.`),
  };
  return response;
}
