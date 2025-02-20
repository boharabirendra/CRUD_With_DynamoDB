import * as UserModel from "../model/user.js";
import { createUser } from "../service/user.js";
import { hashPassword } from "../utils/hashPassword.js";

jest.mock("../model/user.js");
jest.mock("../utils/hashPassword.js");

describe("createUser", () => {
  it("should successfully create a user with a hashed password", async () => {
    const mockUserData = {
      username: "cat",
      password: "cat",
    };

    const mockHashedPassword = "hashedPassword";
    const mockUserModelResult = {
      ...mockUserData,
      password: mockHashedPassword,
    };

    hashPassword.mockResolvedValue(mockHashedPassword);

    UserModel.createUser.mockResolvedValue(mockUserModelResult);

    const result = await createUser(mockUserData);

    expect(result).toEqual(mockUserModelResult);
    expect(UserModel.createUser).toHaveBeenCalledWith({
      ...mockUserData,
      password: mockHashedPassword,
    });
    expect(hashPassword).toHaveBeenCalledWith(mockUserData.password);
  });

  it("should throw an error when hashPassword fails", async () => {
    const mockUserData = {
      username: "testuser",
      password: "plainPassword",
    };
    hashPassword.mockRejectedValue(new Error("Hashing failed"));

    await expect(createUser(mockUserData)).rejects.toThrow(
      "Could not create user in service layer"
    );
  });

  it("should throw an error when createUser fails", async () => {
    const mockUserData = {
      username: "testuser",
      password: "plainPassword",
    };
    const mockHashedPassword = "hashedPassword";
    hashPassword.mockResolvedValue(mockHashedPassword);
    UserModel.createUser.mockRejectedValue(new Error("DB Error"));

    await expect(createUser(mockUserData)).rejects.toThrow(
      "Could not create user in service layer"
    );
  });
});
