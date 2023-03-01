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
  validatorHandler(getContactSchema, "params"),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const contact = await contactService.getContacts(
        parseInt(id),
        parseInt(req.query.limit as string),
        parseInt(req.query.offset as string)
      );
      res.status(200).send(contact);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createContactSchema, "body"),
  async (req, res, next) => {
    try {
      const contact = await contactService.createContact(req.body);
      res.status(201).send(contact);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteContactSchema, "params"),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const contact = await contactService.deleteContact(
        parseInt(id),
      );
      res.status(200).send(contact);
    } catch (err) {
      next(err);
    }
  }
);

export default router;