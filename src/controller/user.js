import * as UserService from "../service/user.js";

export const createUser = async (request, response) => {
  const { username, password } = request.body;
  const user = await UserService.createUser({ username, password });
  return response.send({ status: 200, message: "User created", user });
};

export const login = async (request, response) => {
  try {
    const { username, password } = request.body;

    const { token, user } = await UserService.login({ username, password });

    response.cookie("accessToken", token, {
      httpOnly: true,
    });

    return response.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    return response.status(401).json({ message: error.message });
  }
};
