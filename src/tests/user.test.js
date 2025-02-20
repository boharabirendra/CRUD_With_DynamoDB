import Sinon from "sinon";
import { expect } from "expect";
import * as UserModel from "../model/user.js";
import * as GenerateHashedPassword from "../utils/hashPassword.js";
import * as UserService from "../service/user.js";

describe("UserService", () => {
  describe("createUser", () => {
    let createUserModelStub;
    let hashPasswordStub;

    beforeEach(() => {
      createUserModelStub = Sinon.stub(UserModel, "createUser");
      hashPasswordStub = Sinon.stub(GenerateHashedPassword, "hashPassword");
    });

    afterEach(() => {
      Sinon.restore();
    });

    it("should successfully create a user with hashed password", async () => {
      const mockUserData = {
        username: "testuser",
        password: "password123",
      };

      const mockHashedPassword = "hashedPassword123";
      const expectedCreatedUser = {
        ...mockUserData,
        password: mockHashedPassword,
      };

      hashPasswordStub.resolves(mockHashedPassword);
      createUserModelStub.resolves(expectedCreatedUser);

      const result = await UserService.createUser(mockUserData);

      expect(result).toStrictEqual(expectedCreatedUser);
      expect(hashPasswordStub.callCount).toBe(1);
      expect(hashPasswordStub.getCall(0).args[0]).toBe(mockUserData.password);
      expect(createUserModelStub.callCount).toBe(1);
      expect(createUserModelStub.getCall(0).args[0]).toStrictEqual({
        ...mockUserData,
        password: mockHashedPassword,
      });
    });
  });
});
