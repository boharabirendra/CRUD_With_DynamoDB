import { CreateTableCommand } from "@aws-sdk/client-dynamodb";

import client from "../db/db.js";

export async function createTable() {
  const params = {
    TableName: "Articles",
    KeySchema: [{ AttributeName: "articleId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "articleId", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  };

  try {
    const command = new CreateTableCommand(params);
    const result = await client.send(command);
    console.log("Table created:", result);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
