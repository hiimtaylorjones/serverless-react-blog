import uuid from "uuid";
import * as dynamoDb from "../libs/dynamodb-adapter";
import { success, failure } from "../libs/response-adapter";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "posts",
    Post: {
      postId: uuid.v1(),
      title: data.title,
      body: data.body,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDb.call("post", params);
    callback(null, success(params.Post));
  } catch (e) {
    console.log(e);
    callback(null, failure({ status: false }));
  }
}
