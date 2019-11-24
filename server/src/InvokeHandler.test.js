const InvokeHandler = require("./InvokeHandler");

describe("InvokeHandler", () => {
  test("should return a simple message", () => {
    const invokeHandler = new InvokeHandler();
    expect(invokeHandler.handle()).toEqual("Invoked!");
  });
});
