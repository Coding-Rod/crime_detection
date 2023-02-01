import express from 'express';

import { validatorHandler } from '../middlewares/validator.handler';
import { getContactSchema, createContactSchema, deleteContactSchema } from '../schemas/contact.schema';

import { ContactService } from '../services/contact.service';

const router = express.Router();
const contactService = new ContactService();

router.get('/',
    validatorHandler(getContactSchema, 'body'),
    async (req, res) => {
        const id = parseInt(req.params.id);
        const contact = await contactService.getContact(id);

        res.status(200).send(contact);
    }
);

router.post('/',
    validatorHandler(createContactSchema, 'body'),
    async (req, res) => {
        const contact = await contactService.createContact(req.body);
        res.status(201).send(contact);
    }
);

router.delete('/',
    validatorHandler(deleteContactSchema, 'body'),
    async (req, res) => {
        const id = parseInt(req.params.id);
        const contact = await contactService.deleteContact(id);
        res.status(200).send(contact);
    }
);

export default router;