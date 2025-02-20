import Sinon from "sinon";
import { expect } from "expect";

import * as UserModel from "../model/user.js";
import * as UserService from "../service/user.js";
import * as GenerateHashedPassword from "../utils/hashPassword.js";

describe("Create User", () => {
  const user = {
    username: "cat",
    password: "encryptedPassword",
  };
  let userModelCreateUserStub;
  let passwordGenerateHashedPasswordStub;

  beforeEach(() => {
    userModelCreateUserStub = Sinon.stub(UserModel, "createUser");
    passwordGenerateHashedPasswordStub = Sinon.stub(
      GenerateHashedPassword,
      "hashPassword"
    );
  });

  afterEach(() => {
    Sinon.restore();
  });

  it("Should create user", async () => {
    passwordGenerateHashedPasswordStub.resolves("encryptedPassword");
    userModelCreateUserStub.resolves(user);
    await UserService.createUser(user);
    expect(passwordGenerateHashedPasswordStub.callCount).toBe(1);
    expect(passwordGenerateHashedPasswordStub.getCall(0).args).toStrictEqual([
      user.password,
    ]);
    expect(userModelCreateUserStub.callCount).toBe(1);
    expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
      {
        ...user,
        password: "encryptedPassword",
      },
    ]);
  });
});
