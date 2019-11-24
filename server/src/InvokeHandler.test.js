const InvokeHandler = require("./InvokeHandler");

describe("InvokeHandler", () => {
  test("should respond with a 404 error for unknown requests", async () => {
    const dynamoDb = {};
    const invokeHandler = new InvokeHandler({ dynamoDb });
    const event = {};
    expect(await invokeHandler.handle(event)).toEqual(expect.objectContaining({ statusCode: 404 }));
  });
});
