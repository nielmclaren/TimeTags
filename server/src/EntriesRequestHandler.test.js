const EntryFactory = require("./EntryFactory");
const EntriesRequestHandler = require("./EntriesRequestHandler");
const InvokeEventFactory = require("./InvokeEventFactory");

const entryFactory = new EntryFactory();
const invokeEventFactory = new InvokeEventFactory();

describe("EntriesRequestHandler", () => {
  let dynamoDb;
  let entriesRequestHandler;
  let invokeEvent;

  beforeEach(() => {
    dynamoDb = {
      getItem: () => ({ promise: () => Promise.resolve({ Item: {} }) }),
      putItem: () => ({ promise: () => Promise.resolve("dynamodb put succeeded!") }),
    };
    entriesRequestHandler = new EntriesRequestHandler({ dynamoDb, entryFactory });
    invokeEvent = invokeEventFactory.create();
  });

  test("should handle get request", async () => {
    invokeEvent.method("GET").path("/entries/2016-01-08");
    expect(await entriesRequestHandler.handle(invokeEvent)).toBeDefined();
  });

  test("should handle put request", async () => {
    invokeEvent
      .body({ entryDate: "2016-01-08", entryText: "Entry text" })
      .method("PUT")
      .path("/entries/2016-01-08");
    expect(await entriesRequestHandler.handle(invokeEvent)).toBeDefined();
  });

  test("should throw error for put request with mismatched entry dates", async () => {
    invokeEvent
      .body({ entryDate: "2016-01-08", entryText: "Entry text" })
      .method("PUT")
      .path("/entries/2018-12-25");
    await expect(entriesRequestHandler.handle(invokeEvent)).rejects.toThrow();
  });

  test("should ignore requests for other paths", async () => {
    invokeEvent.path("/admin.php");
    expect(await entriesRequestHandler.handle(invokeEvent)).not.toBeDefined();
  });
});
