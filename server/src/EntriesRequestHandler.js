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

    console.log("Getting item", params);
    const data = await this._dynamoDb.getItem(params).promise();
    console.log("EntriesRequestHandler GET succeeded", data.Item);
    const entry = { EntryDate: data.Item.EntryDate, EntryText: data.Item.EntryText };

    const response = {
      statusCode: 200,
      body: JSON.stringify(entry),
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
    const pathEntryDate = this._getEntryDate(invokeEvent);
    const { EntryDate: entryDate, EntryText: entryText } = invokeEvent.body();

    if (entryDate === undefined) {
      throw new Error("EntryDate parameter is required.");
    }

    if (entryText === undefined) {
      throw new Error("EntryText parameter is required.");
    }

    if (pathEntryDate !== entryDate) {
      throw new Error("EntryDate parameter in the path and the body must match.");
    }

    const params = {
      TableName: "TimeTagsEntries",
      Item: { EntryDate: { S: entryDate }, EntryText: { S: entryText } },
    };

    console.log("Putting item", params);
    const data = await this._dynamoDb.putItem(params).promise();
    console.log("EntriesRequestHandler PUT succeeded", data);

    const response = {
      statusCode: 200,
      body: JSON.stringify("EntriesRequestHandler PUT succeeded"),
    };

    return response;
  }
}
module.exports = EntriesRequestHandler;
