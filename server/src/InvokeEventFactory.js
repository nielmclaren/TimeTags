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
      this._body = context["body-json"] ? JSON.parse(context["body-json"]) : null;
      this._method = context["http-method"] || null;
      this._path = context["resource-path"] || null;
    } else {
      this._body = null;
      this._method = null;
      this._path = null;
    }
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
