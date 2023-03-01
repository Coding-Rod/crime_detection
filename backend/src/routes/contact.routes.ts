import express from "express";
import passport from "passport";

import { validatorHandler } from "../middlewares/validator.handler";
import { validateTokenAndId } from "../middlewares/auth.handler";
import {
  getContactSchema,
  createContactSchema,
  deleteContactSchema,
} from "../schemas/contact.schema";

import { ContactService } from "../services/contact.service";

const router = express.Router();
const contactService = new ContactService();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(getContactSchema, "params"),
  async (req, res, next) => {
    try {
      const contact = await contactService.getContacts(
        parseInt(req.params.id),
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
  validateTokenAndId,
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
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(deleteContactSchema, "params"),
  async (req, res, next) => {
    try {
      const contact = await contactService.deleteContact(
        parseInt(req.params.id)
      );
      res.status(200).send(contact);
    } catch (err) {
      next(err);
    }
  }
);

export default router;