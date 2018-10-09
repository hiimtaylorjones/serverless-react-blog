import * as dynamoDb from "../libs/dynamodb-adapter";
import { success, failure } from "../libs/response-adapter";

export async function main(event, context, callback) {
  const params = {
	  TableName: "posts"
  };

  try {
	  const result = await dynamoDb.call("query", params);
	  callback(null, success(result.Posts));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
