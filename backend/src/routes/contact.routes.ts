import express from "express";
import passport from "passport";

import { validatorHandler } from "../middlewares/validator.handler";
import {
  getContactSchema,
  createContactSchema,
  deleteContactSchema,
} from "../schemas/contact.schema";

import { ContactService } from "../services/contact.service";

const router = express.Router();
const contactService = new ContactService();

router.get(
  "/:caller",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getContactSchema, "params"),
  async (req, res) => {
    const contact = await contactService.getContacts(
      parseInt(req.params.caller)
    );
    res.status(200).send(contact);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createContactSchema, "body"),
  async (req, res) => {
    const contact = await contactService.createContact(req.body);
    res.status(201).send(contact);
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteContactSchema, "params"),
  async (req, res) => {
    const contact = await contactService.deleteContact(parseInt(req.params.id));
    res.status(200).send(contact);
  }
);

export default router;
