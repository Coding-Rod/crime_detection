import express from "express";
import passport from "passport";

import { UserService } from "../services/user.service";
import { getId } from "../utils/db/getId";

const router = express.Router();
const userService = new UserService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);        
      res.status(200).send(req.query.search
      ? await userService.getUser(id, req.query.search as string)
      : await userService.getUser(req.query.id ? parseInt(req.query.id as string) : id));
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
        id,
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
      const user = await userService.deleteUser(id);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
