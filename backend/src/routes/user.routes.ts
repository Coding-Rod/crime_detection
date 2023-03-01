import express from "express";
import passport from "passport";

import { validatorHandler } from "../middlewares/validator.handler";
import { validateTokenAndId } from "../middlewares/auth.handler";

import {
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../schemas/user.schema";
import { UserService } from "../services/user.service";

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
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const user = await userService.getUser(parseInt(req.params.id));
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(updateUserSchema, "params"),
  async (req, res, next) => {
    try {
      const user = await userService.updateUser(
        parseInt(req.params.id),
        req.body
      );
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(deleteUserSchema, "params"),
  async (req, res, next) => {
    try {
      const user = await userService.deleteUser(parseInt(req.params.id));
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
