class InvokeHandler {
  constructor({ entriesRequestHandler, invokeEventFactory }) {
    this._entriesRequestHandler = entriesRequestHandler;
    this._invokeEventFactory = invokeEventFactory;
  }

  async handle(event) {
    const invokeEvent = this._invokeEventFactory.create(event);

    let result;

    result = this._entriesRequestHandler.handle(invokeEvent);
    if (result) return result;

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
