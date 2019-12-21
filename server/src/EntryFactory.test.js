const EntryFactory = require("./EntryFactory");

describe("EntryFactory", () => {
  test("should correctly parse entry json", () => {
    const entryFactory = new EntryFactory();
    const entryJson = { entryDate: "2016-01-08", entryText: "Entry text" };
    const entry = entryFactory.create(entryJson);
    expect(entry.date()).toEqual("2016-01-08");
    expect(entry.text()).toEqual("Entry text");
  });

  test("should set missing values to null", () => {
    const entryFactory = new EntryFactory();
    const entryJson = {};
    const entry = entryFactory.create(entryJson);
    expect(entry.date()).toEqual(null);
    expect(entry.text()).toEqual(null);
  });

  test("should correctly parse DynamoDB entry json", () => {
    const entryFactory = new EntryFactory();
    const entryJson = { EntryDate: { S: "2016-01-08" }, EntryText: { S: "Entry text" } };
    const entry = entryFactory.createFromDynamoDb(entryJson);
    expect(entry.date()).toEqual("2016-01-08");
    expect(entry.text()).toEqual("Entry text");
  });
});
