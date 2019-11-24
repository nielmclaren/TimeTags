class InvokeEvent {
  constructor() {}

  get body() {
    return this._body;
  }

  get method() {
    return this._method;
  }

  get path() {
    return this._path;
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
