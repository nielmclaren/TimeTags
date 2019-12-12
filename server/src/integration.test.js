const EntriesRequestHandler = require("./EntriesRequestHandler");
const InvokeEventFactory = require("./InvokeEventFactory");
const InvokeHandler = require("./InvokeHandler");

describe("Integration test", () => {
  let dynamoDb;
  let entriesRequestHandler;
  let invokeEventFactory;
  let invokeHandler;

  beforeEach(() => {
    dynamoDb = {
      getItem: () => ({ promise: () => Promise.resolve({ Item: {} }) }),
      putItem: () => ({ promise: () => Promise.resolve("dynamodb put succeeded!") }),
    };
    entriesRequestHandler = new EntriesRequestHandler({ dynamoDb });
    invokeEventFactory = new InvokeEventFactory();
    invokeHandler = new InvokeHandler({ entriesRequestHandler, invokeEventFactory });
  });

  test("should handle get entry", async () => {
    const event = {
      context: {
        "http-method": "GET",
        "resource-path": "/entries/2019-11-23",
      },
    };
    expect(await invokeHandler.handle(event)).toEqual(expect.objectContaining({ statusCode: 200 }));
  });

  test("should handle put entry", async () => {
    const event = {
      context: {
        "body-json": '{ "entryDate": "2016-01-08", "entryText": "Entry text" }',
        "http-method": "PUT",
        "resource-path": "/entries/2019-11-23",
      },
    };
    expect(await invokeHandler.handle(event)).toEqual(expect.objectContaining({ statusCode: 200 }));
  });
});
