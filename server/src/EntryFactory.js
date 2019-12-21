class Entry {
  constructor() {}

  date(value) {
    if (!arguments.length) return this._date;
    this._date = value;
    return this;
  }

  text(value) {
    if (!arguments.length) return this._text;
    this._text = value;
    return this;
  }

  toJson() {
    return {
      entryDate: this._date,
      entryText: this._text,
    };
  }

  _updateFromJson(json) {
    console.log("EntryFactory._updateFromJson", "raw json", json);
    this._date = json.entryDate ? json.entryDate : null;
    this._text = json.entryText || null;
  }

  _updateFromDynamoDB(json) {
    console.log("EntryFactory._updateFromDynamoDB", "raw json", json);
    this._date = json.EntryDate ? json.EntryDate.S : null;
    this._text = json.EntryText ? json.EntryText.S : null;
  }
}

class EntryFactory {
  constructor(dependencies) {
    this._dependencies = dependencies;
  }

  create(entryJson) {
    const entry = new Entry(this._dependencies);
    if (entryJson) {
      entry._updateFromJson(entryJson);
    }
    return entry;
  }

  createFromDynamoDb(entryJson) {
    const entry = new Entry(this._dependencies);
    if (entryJson) {
      entry._updateFromDynamoDB(entryJson);
    }
    return entry;
  }
}

module.exports = EntryFactory;
