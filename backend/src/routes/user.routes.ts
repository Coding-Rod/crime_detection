import express from "express";
import passport from "passport";

import { validatorHandler } from "../middlewares/validator.handler";
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
  async (req, res) => {
    const user = await userService.getUsers(req.query);
    res.status(200).send(user);
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserSchema, "params"),
  async (req, res) => {
    const user = await userService.getUser(parseInt(req.params.id));
    res.status(200).send(user);
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateUserSchema, "params"),
  async (req, res) => {
    const user = await userService.updateUser(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).send(user);
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteUserSchema, "params"),
  async (req, res) => {
    const user = await userService.deleteUser(parseInt(req.params.id));
    res.status(200).send(user);
  }
);

export default router;
