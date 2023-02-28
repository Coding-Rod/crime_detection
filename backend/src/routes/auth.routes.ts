import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import validatorHandler from "../middlewares/validator.handler";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

import { comparePassword } from "../utils/auth/pass-hash";
import { config } from "../config";
import { client } from "../db/config";

import { UserService } from "../services/user.service";

const router = express.Router();
const userService = new UserService();

router.post(
  "/register",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validatorHandler(loginUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await client.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      if (!user.rows[0]) return res.status(401).json({ message: "Invalid credentials" });
      const isValidPassword = await comparePassword(password, user.rows[0].password);

      if (!isValidPassword) return res.status(401).json({ message: "Invalid credentials" });
      const token = jwt.sign({ id: user.rows[0].id }, config.jwtSecret as string);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
