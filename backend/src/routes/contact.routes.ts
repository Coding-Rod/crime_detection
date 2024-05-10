import express from "express";
import passport from "passport";

import { validatorHandler } from "../middlewares/validator.handler";
import {
  getContactSchema,
  createContactSchema,
  deleteContactSchema,
} from "../schemas/contact.schema";

import { ContactService } from "../services/contact.service";
import { getId } from "../utils/db/getId";

const router = express.Router();
const contactService = new ContactService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const caller = await getId(req.headers.authorization as string);
      res.status(200).send(await contactService.getContacts(
        caller,
        req.query.limit ? parseInt(req.query.limit as string) : 10,
        req.query.offset ? parseInt(req.query.offset as string) : 0
      ));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/:id",
  validatorHandler(createContactSchema, "params"),
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const caller = await getId(req.headers.authorization as string);
      res.status(201).send(await contactService.createContact(
        caller,
        parseInt(req.params.id)
      ));
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteContactSchema, "params"),
  async (req, res, next) => {
    try {
      const caller = await getId(req.headers.authorization as string);
      res.status(200).send(await contactService.deleteContact(
        caller,
        parseInt(req.params.id)
      ));
    } catch (err) {
      next(err);
    }
  }
);

export default router;