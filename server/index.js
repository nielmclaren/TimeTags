exports.handler = async event => {
  switch (event.context["resource-path"]) {
    case "/logs":
      return handleLogs(event);
    default:
      return handleDefault(event);
  }
};

function handleLogs(event) {
  switch (event.context["http-method"]) {
    case "GET":
      return handleLogsGet(event);
    default:
      return handleDefault();
  }
}

function handleLogsGet(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Here are your logs!"),
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
