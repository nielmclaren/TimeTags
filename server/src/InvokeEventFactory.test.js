const InvokeEventFactory = require("./InvokeEventFactory");

describe("InvokeEventFactory", () => {
  test("should correctly parse event json", () => {
    const invokeEventFactory = new InvokeEventFactory();
    const event = { context: { "body-json": '"Confirmed"', "http-method": "DELETE", "resource-path": "/index.php" } };
    const invokeEvent = invokeEventFactory.create(event);
    expect(invokeEvent.body).toEqual("Confirmed");
    expect(invokeEvent.method).toEqual("DELETE");
    expect(invokeEvent.path).toEqual("/index.php");
  });
});
