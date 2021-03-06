const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const dynamoDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const EntryFactory = require("./src/EntryFactory");
const entryFactory = new EntryFactory();
const InvokeEventFactory = require("./src/InvokeEventFactory");
const invokeEventFactory = new InvokeEventFactory();
const EntriesRequestHandler = require("./src/EntriesRequestHandler");
const entriesRequestHandler = new EntriesRequestHandler({ dynamoDb, entryFactory });
const InvokeHandler = require("./src/InvokeHandler");

const invokeHandler = new InvokeHandler({ entriesRequestHandler, invokeEventFactory });

exports.handler = async event => invokeHandler.handle(event);
