import AWS from "aws-sdk";

// Remember, this needs to be the region that your specific AWS
// profile is configured to!
AWS.config.update({ region: "us-west-2" });

// Calls DynamoDB in AWS given an action and paramters.
// Example:
//   dynamodbInstance.call("put", {"name": "hello"});
export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  return dynamoDb[action](params).promise();
}
