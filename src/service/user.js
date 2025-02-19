import { compare } from "bcryptjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";

import * as UserModel from "../model/user.js";
import { hashPassword } from "../utils/hashPassword.js";
import { generateToken, verifyToken } from "../utils/jwtUtils.js";

export const createUser = async (userData) => {
  try {
    const { password } = userData;
    const hashedPassword = await hashPassword(password);
    const result = await UserModel.createUser({
      ...userData,
      password: hashedPassword,
    });
    return result;
  } catch (error) {
    console.error("Error in service layer - createUser:", error);
    throw new Error("Could not create article in service layer");
  }
};

export const login = async (credentials) => {
  try {
    const { username, password } = credentials;

    const { Item } = await UserModel.getUserByUsername(username);
    const user = unmarshall(Item);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      username: user.username,
    });

    return {
      token,
      user: {
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Error in service layer - login:", error);
    throw new Error("Login failed");
  }
};
