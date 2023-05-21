import express from "express";
import passport from "passport";

import validatorHandler from "../middlewares/validator.handler";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";

import { UserService } from "../services/user.service";
import { getId } from "../utils/db/getId";

const router = express.Router();
const userService = new UserService();

router.post(
  "/register",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      res.status(201).json(await userService.createUser(req.body));
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
      res.status(200).json(await userService.loginUser(req.body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/token/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    console.log(req.headers.authorization);
    try {
      const id = await getId(req.headers.authorization as string);
      res.status(200).send(await userService.setFcmToken(id, req.body.token));
    } catch (err) {
      next(err);
    }
  }
)

export default router;
