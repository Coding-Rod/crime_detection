import Joi from "joi";

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(30);
const username = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8).max(30);
const phone = Joi.number().integer().min(8).max(30);
const createdAt = Joi.date();
const updatedAt = Joi.date();

export const createUserSchema = Joi.object({
    name: name.required(),
    username: username.required(),
    email: email.required(),
    password: password.required(),
    phone: phone.required(),
});

export const getUserSchema = Joi.object({
    id: id.required(),
});

export const updateUserSchema = Joi.object({
    id: id.required(),
    name: name,
    username: username,
    email: email,
    password: password,
    phone: phone,
});

export const deleteUserSchema = Joi.object({
    id: id.required(),
});

export const loginUserSchema = Joi.object({
    username: username.required(),
    password: password.required(),
});

export const userSchema = Joi.object({
    id: id,
    name: name,
    username: username,
    email: email,
    password: password,
    createdAt: createdAt,
    updatedAt: updatedAt,
    phone: phone,
});