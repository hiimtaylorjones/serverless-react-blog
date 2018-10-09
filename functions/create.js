import uuid from "uuid";
import * as dynamoDb from "../libs/dynamodb-adapter";
import { success, failure } from "../libs/response-adapter";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "posts",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postUuid: uuid.v1(),
      title: data.title,
      body: data.body,
      createdAt: Date.now()
    }
  };

  try {
    // Even though we're technically POST'ing for this, we're actually
    // calling 'put' in DynamoDB terms
    await dynamoDb.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
