class InvokeHandler {
  constructor({ dynamoDb }) {
    this._dynamoDb = dynamoDb;
  }

  async handle(event) {
    if (event.context) {
      const path = event.context["resource-path"];
      if (this.isEntriesPath(path)) {
        return await this.handleEntries(event);
      }
    }
    return this.handleDefault(event);
  }

  isEntriesPath(path) {
    return path.match(/^\/entries/);
  }

  async handleEntries(event) {
    switch (event.context["http-method"]) {
      case "GET":
        return await this.handleEntriesGet(event);
      case "PUT":
        return await this.handleEntriesPut(event);
      default:
        return this.handleDefault();
    }
  }

  async handleEntriesGet(event) {
    const entryDate = this.getEntryDate(event);
    const params = {
      TableName: "TimeTagsEntries",
      Key: {
        EntryDate: { S: entryDate },
      },
      ProjectionExpression: "EntryDate, EntryText",
    };

    const data = await this._dynamoDb.getItem(params).promise();
    console.log("Success", data.Item);

    const response = {
      statusCode: 200,
      body: JSON.stringify("Here are your entries!"),
    };

    return response;
  }

  getEntryDate(event) {
    const path = event.context["resource-path"];
    const matches = path.match(/^\/entries\/(\d{4}-\d{2}-\d{2})/);
    if (!matches) {
      throw new Error(`Bad request: ${event.context["http-method"]} ${event.context["resource-path"]}`);
    }
    return matches[1];
  }

  async handleEntriesPut(event) {
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
    const data = await this._dynamoDb.putItem(params).promise();
    console.log("Success", data);
  }

  handleDefault(event) {
    const response = {
      statusCode: 404,
      body: "Request not found.",
    };
    return response;
  }
}

module.exports = InvokeHandler;
