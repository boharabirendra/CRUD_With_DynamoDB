import {
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

import client from "../db/db.js";

const TABLE_NAME = "Articles";

export const getAllArticles = () => {
  const command = new ScanCommand({ TableName: TABLE_NAME });
  return client.send(command);
};

export const getArticleById = (articleId) => {
  const command = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: marshall({ articleId }),
  });
  return client.send(command);
};

export const createArticle = (articleData) => {
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: marshall(articleData),
  });
  return client.send(command);
};

export const deleteArticle = (articleId) => {
  const command = new DeleteItemCommand({
    TableName: TABLE_NAME,
    Key: marshall({ articleId }),
  });
  return client.send(command);
};

export const updateArticleById = (articleId, updateData) => {
  const updateExpression = [];
  const expressionAttributeValues = {};
  const expressionAttributeNames = {};

  Object.keys(updateData).forEach((key, index) => {
    const attrName = `#attr${index}`;
    const attrValue = `:val${index}`;

    updateExpression.push(`${attrName} = ${attrValue}`);
    expressionAttributeNames[attrName] = key;
    expressionAttributeValues[attrValue] = updateData[key];
  });

  if (updateExpression.length === 0) {
    throw new Error("No update data provided");
  }

  const params = {
    TableName: TABLE_NAME,
    Key: marshall({ articleId }),
    UpdateExpression: `SET ${updateExpression.join(", ")}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: marshall(expressionAttributeValues),
    ReturnValues: "ALL_NEW",
  };

  const command = new UpdateItemCommand(params);
  return client.send(command);
};
