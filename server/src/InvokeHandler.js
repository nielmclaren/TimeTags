class InvokeHandler {
  constructor({ dynamoDb, invokeEventFactory }) {
    this._dynamoDb = dynamoDb;
    this._invokeEventFactory = invokeEventFactory;
  }

  async handle(event) {
    const invokeEvent = this._invokeEventFactory.create(event);
    if (this.isEntriesPath(invokeEvent.path())) {
      return await this.handleEntries(invokeEvent);
    }
    return this.handleDefault(invokeEvent);
  }

  isEntriesPath(path) {
    return path && path.match(/^\/entries/);
  }

  async handleEntries(invokeEvent) {
    switch (invokeEvent.method()) {
      case "GET":
        return await this.handleEntriesGet(invokeEvent);
      case "PUT":
        return await this.handleEntriesPut(invokeEvent);
      default:
        return this.handleDefault();
    }
  }

  async handleEntriesGet(invokeEvent) {
    const entryDate = this.getEntryDate(invokeEvent);
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

  getEntryDate(invokeEvent) {
    const path = invokeEvent.path();
    const matches = path.match(/^\/entries\/(\d{4}-\d{2}-\d{2})/);
    if (!matches) {
      throw new Error(`Bad request: ${invokeEvent.method()} ${invokeEvent.path()}`);
    }
    return matches[1];
  }

  async handleEntriesPut(invokeEvent) {
    const { entryDate, entryText } = JSON.parse(invokeEvent.body());

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

  handleDefault(invokeEvent) {
    const response = {
      statusCode: 404,
      body: "Request not found.",
    };
    return response;
  }
}

module.exports = InvokeHandler;
