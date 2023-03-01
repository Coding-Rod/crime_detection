import express from "express";
import passport from "passport";

import { validatorHandler } from "../middlewares/validator.handler";

import {
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { getId } from "../utils/db/getId";

const router = express.Router();
const userService = new UserService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user = await userService.getUsers(req.query);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const user = await userService.getUser(parseInt(id));
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const user = await userService.updateUser(
        parseInt(id),
        req.body
      );
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const user = await userService.deleteUser(parseInt(id));
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
