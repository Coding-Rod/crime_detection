import Joi from "joi";

const id = Joi.number().integer().min(1);
const called = Joi.number().integer().min(1);
const caller = Joi.number().integer().min(1);
const createdAt = Joi.date();
const updatedAt = Joi.date();

export const getContactSchema = Joi.object({
    caller: caller.required(),
});

export const createContactSchema = Joi.object({
    called: called.required(),
    caller: caller.required(),
});

export const deleteContactSchema = Joi.object({
    id: id.required(),
});

export const contactSchema = Joi.object({
    id: id,
    called: called,
    caller: caller,
    createdAt: createdAt,
    updatedAt: updatedAt,
});