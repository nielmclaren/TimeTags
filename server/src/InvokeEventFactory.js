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
    if (json.context) {
      const { context } = json;
      this._body = JSON.parse(context["body-json"]);
      this._method = context["http-method"];
      this._path = context["resource-path"];
    }
  }
}

class InvokeEventFactory {
  constructor(dependencies) {
    this._dependencies = dependencies;
  }

  create(jsonEvent) {
    const invokeEvent = new InvokeEvent(this._dependencies);
    invokeEvent._updateFromJson(jsonEvent);
    return invokeEvent;
  }
}

module.exports = InvokeEventFactory;
