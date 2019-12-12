const InvokeHandler = require("./InvokeHandler");
const InvokeEventFactory = require("./InvokeEventFactory");

describe("InvokeHandler", () => {
  let handleEntriesRequest;
  let entriesRequestHandler;
  let invokeEventFactory;
  let invokeHandler;

  beforeEach(() => {
    invokeEventFactory = new InvokeEventFactory();
    handleEntriesRequest = jest.fn();
    entriesRequestHandler = { handle: handleEntriesRequest };
    invokeHandler = new InvokeHandler({ entriesRequestHandler, invokeEventFactory });
  });

  test("should delegate entries requests", async () => {
    handleEntriesRequest.mockReturnValue(Promise.resolve("entries request handler success"));

    const event = { context: { "resource-path": "/entries/2016-01-08" } };
    expect(await invokeHandler.handle(event)).toEqual("entries request handler success");
    expect(entriesRequestHandler.handle).toHaveBeenCalled();
  });

  test("should respond with a 404 error for unknown requests", async () => {
    handleEntriesRequest.mockReturnValue(undefined);

    const event = {};
    expect(await invokeHandler.handle(event)).toEqual(expect.objectContaining({ statusCode: 404 }));
  });
});
