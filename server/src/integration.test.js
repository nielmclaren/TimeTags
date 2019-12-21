const EntriesRequestHandler = require("./EntriesRequestHandler");
const EntryFactory = require("./EntryFactory");
const InvokeEventFactory = require("./InvokeEventFactory");
const InvokeHandler = require("./InvokeHandler");

const entryFactory = new EntryFactory();
const invokeEventFactory = new InvokeEventFactory();

describe("Integration test", () => {
  let dynamoDb;
  let entriesRequestHandler;
  let invokeHandler;

  beforeEach(() => {
    dynamoDb = {
      getItem: () => ({ promise: () => Promise.resolve({ Item: {} }) }),
      putItem: () => ({ promise: () => Promise.resolve("dynamodb put succeeded!") }),
    };
    entriesRequestHandler = new EntriesRequestHandler({ dynamoDb, entryFactory });
    invokeHandler = new InvokeHandler({ entriesRequestHandler, invokeEventFactory });
  });

  test("should handle get entry", async () => {
    const event = {
      path: "/entries/2016-01-08",
      httpMethod: "GET",
      body: null,
    };
    expect(await invokeHandler.handle(event)).toEqual(expect.objectContaining({ statusCode: 200 }));
  });

  test("should handle put entry", async () => {
    const event = {
      body: '{ "entryDate": "2019-11-23", "entryText": "Entry text" }',
      httpMethod: "PUT",
      path: "/entries/2019-11-23",
    };
    expect(await invokeHandler.handle(event)).toEqual(expect.objectContaining({ statusCode: 200 }));
  });

  test("should propagate errors", async () => {
    const event = {
      body: '{ "entryDate": "2019-11-23", "entryText": "Entry text" }',
      httpMethod: "PUT",
      path: "/entries/2016-01-08",
    };
    await expect(invokeHandler.handle(event)).rejects.toThrow();
  });
});
