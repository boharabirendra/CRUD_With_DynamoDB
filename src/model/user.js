import { marshall } from "@aws-sdk/util-dynamodb";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

import client from "../db/db.js";

const TABLE_NAME = "Users";

export const createUser = (userData) => {
  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: marshall(userData),
  });
  return client.send(command);
};

export const getUserByUsername = (username) => {
  const command = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: marshall({ username }),
  });
  return client.send(command);
};
