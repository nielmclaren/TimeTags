class InvokeEvent {
  constructor() {}

  body(value) {
    if (!arguments.length) return this._body;
    this._body = value;
    return this;
  }

  method(value) {
    if (!arguments.length) return this._method;
    this._method = value;
    return this;
  }

  path(value) {
    if (!arguments.length) return this._path;
    this._path = value;
    return this;
  }

  _updateFromJson(json) {
    console.log("InvokeEventFactory._updateFromJson", "raw json", json);
    this._body = json.body ? JSON.parse(json.body) : null;
    this._method = json.httpMethod || null;
    this._path = json.path || null;
  }
}

class InvokeEventFactory {
  constructor(dependencies) {
    this._dependencies = dependencies;
  }

  create(jsonEvent) {
    const invokeEvent = new InvokeEvent(this._dependencies);
    if (jsonEvent) {
      invokeEvent._updateFromJson(jsonEvent);
    }
    return invokeEvent;
  }
}

module.exports = InvokeEventFactory;
