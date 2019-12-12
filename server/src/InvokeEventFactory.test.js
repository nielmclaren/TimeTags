const InvokeEventFactory = require("./InvokeEventFactory");

describe("InvokeEventFactory", () => {
  test("should correctly parse event json", () => {
    const invokeEventFactory = new InvokeEventFactory();
    const event = { context: { "body-json": '"Confirmed"', "http-method": "DELETE", "resource-path": "/index.php" } };
    const invokeEvent = invokeEventFactory.create(event);
    expect(invokeEvent.body()).toEqual("Confirmed");
    expect(invokeEvent.method()).toEqual("DELETE");
    expect(invokeEvent.path()).toEqual("/index.php");
  });

  test("should correctly parse partial event json", () => {
    const invokeEventFactory = new InvokeEventFactory();
    const event = { context: { "http-method": "GET", "resource-path": "/entries/2016-01-08" } };
    const invokeEvent = invokeEventFactory.create(event);
    expect(invokeEvent.body()).toEqual(null);
    expect(invokeEvent.method()).toEqual("GET");
    expect(invokeEvent.path()).toEqual("/entries/2016-01-08");
  });

  test("should set missing values to null", () => {
    const invokeEventFactory = new InvokeEventFactory();
    const event = {};
    const invokeEvent = invokeEventFactory.create(event);
    expect(invokeEvent.body()).toEqual(null);
    expect(invokeEvent.method()).toEqual(null);
    expect(invokeEvent.path()).toEqual(null);
  });
});
