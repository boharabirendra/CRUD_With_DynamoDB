import express from "express";
import * as UserController from "../controller/user.js";

const router = express.Router();

router.post("/login", UserController.login);
router.post("/create", UserController.createUser);

export default router;
