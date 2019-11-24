const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const dynamoDb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const InvokeHandler = require("./src/InvokeHandler");
const invokeHandler = new InvokeHandler({ dynamoDb });

exports.handler = async event => invokeHandler.handle(event);
