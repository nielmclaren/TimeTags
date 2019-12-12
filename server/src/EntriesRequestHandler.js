class EntriesRequestHandler {
  constructor({ dynamoDb }) {
    this._dynamoDb = dynamoDb;
  }

  async handle(invokeEvent) {
    if (this._isEntriesPath(invokeEvent.path())) {
      switch (invokeEvent.method()) {
        case "GET":
          return await this._handleGet(invokeEvent);
        case "PUT":
          return await this._handlePut(invokeEvent);
        default:
      }
    }
  }

  _isEntriesPath(path) {
    return path && path.match(/^\/entries/);
  }

  async _handleGet(invokeEvent) {
    const entryDate = this._getEntryDate(invokeEvent);
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

  _getEntryDate(invokeEvent) {
    const path = invokeEvent.path();
    const matches = path.match(/^\/entries\/(\d{4}-\d{2}-\d{2})/);
    if (!matches) {
      throw new Error(`Bad request: ${invokeEvent.method()} ${invokeEvent.path()}`);
    }
    return matches[1];
  }

  async _handlePut(invokeEvent) {
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

    const response = {
      statusCode: 200,
      body: JSON.stringify("Put succeeded."),
    };

    return response;
  }
}
module.exports = EntriesRequestHandler;
