import * as dynamoDb from "../libs/dynamodb-adapter";
import { success, failure } from "../libs/response-adapter";

export async function main(event, context, callback) {
  const params = {
    TableName: "posts",
    ProjectionExpression: "#postId, title, body, createdAt",
    ExpressionAttributeNames: {
      "#postId": "postId",
    }
  };

  try {
    // Call the 'scan' action on DynamoDB. This will return 
    // all of the posts we have in our table.
	  const result = await dynamoDb.call("scan", params);
	  callback(null, success(result.Items));
  } catch (e) {
    callback(null, failure({ status: false, message: e }));
  }
}
