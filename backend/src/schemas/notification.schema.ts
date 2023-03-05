import Joi from "joi";

const id = Joi.number().integer().min(1);
const type = Joi.number().integer().min(1);
const message = Joi.string().min(3).max(30);
const userId = Joi.number().integer().min(1);
const createdAt = Joi.date();

export const createNotificationSchema = Joi.object({
    type: type.required(),
    message: message.required(),
});

export const getNotificationSchema = Joi.object({
    id: id.required(),
});

export const notificationSchema = Joi.object({
    id: id,
    type: type,
    message: message,
    userId: userId,
    createdAt: createdAt,
});