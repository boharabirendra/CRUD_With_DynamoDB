import { expect } from "expect";

// Mock the modules before importing them
jest.mock("../model/user.js");
jest.mock("../utils/hashPassword.js");

let UserModel;
let GenerateHashedPassword;
let UserService;

describe("UserService", () => {
  beforeEach(async () => {
    // Dynamically import modules after Jest has mocked them
    UserModel = await import("../model/user.js");
    GenerateHashedPassword = await import("../utils/hashPassword.js");
    UserService = await import("../service/user.js");
  });

  describe("createUser", () => {
    it("should successfully create a user with hashed password", async () => {
      const mockUserData = { username: "testuser", password: "password123" };
      const mockHashedPassword = "hashedPassword123";
      const expectedCreatedUser = {
        ...mockUserData,
        password: mockHashedPassword,
      };

      GenerateHashedPassword.hashPassword.mockResolvedValue(mockHashedPassword);
      UserModel.createUser.mockResolvedValue(expectedCreatedUser);

      const result = await UserService.createUser(mockUserData);

      // Assertions
      expect(result).toStrictEqual(expectedCreatedUser);
      expect(GenerateHashedPassword.hashPassword).toHaveBeenCalledWith(
        mockUserData.password
      );
      expect(UserModel.createUser).toHaveBeenCalledWith({
        ...mockUserData,
        password: mockHashedPassword,
      });
    });
  });
});
