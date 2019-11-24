const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const dynamoDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const InvokeEventFactory = require("./src/InvokeEventFactory");
const invokeEventFactory = new InvokeEventFactory();
const InvokeHandler = require("./src/InvokeHandler");
const invokeHandler = new InvokeHandler({ dynamoDb, invokeEventFactory });

exports.handler = async event => invokeHandler.handle(event);
