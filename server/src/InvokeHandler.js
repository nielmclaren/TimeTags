class InvokeHandler {
  constructor({ entriesRequestHandler, invokeEventFactory }) {
    this._entriesRequestHandler = entriesRequestHandler;
    this._invokeEventFactory = invokeEventFactory;
  }

  async handle(event) {
    console.log("InvokeHandler.handle", JSON.stringify(event));
    const invokeEvent = this._invokeEventFactory.create(event);

    let result;

    result = await this._entriesRequestHandler.handle(invokeEvent);
    if (result) return result;

    console.log("InvokeHandler.handle", "default response");
    return this._handleDefault(invokeEvent);
  }

  _handleDefault(invokeEvent) {
    const response = {
      statusCode: 404,
      body: "Request not found.",
    };
    return response;
  }
}

module.exports = InvokeHandler;
