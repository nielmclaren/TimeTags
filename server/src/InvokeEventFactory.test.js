const InvokeEventFactory = require("./InvokeEventFactory");

describe("InvokeEventFactory", () => {
  test("should correctly parse event json", () => {
    const invokeEventFactory = new InvokeEventFactory();
    const event = {
      body: JSON.stringify({ EntryDate: "2016-01-08", entryText: "Entry text" }),
      httpMethod: "DELETE",
      path: "/index.php",
    };
    const invokeEvent = invokeEventFactory.create(event);
    expect(invokeEvent.body()).toEqual({ EntryDate: "2016-01-08", entryText: "Entry text" });
    expect(invokeEvent.method()).toEqual("DELETE");
    expect(invokeEvent.path()).toEqual("/index.php");
  });

  test("should correctly parse partial event json", () => {
    const invokeEventFactory = new InvokeEventFactory();
    const event = { httpMethod: "GET", path: "/entries/2016-01-08" };
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
