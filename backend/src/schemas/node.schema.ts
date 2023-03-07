import Joi from "joi";

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(30);
const location = Joi.string().min(3).max(30);
const userId = Joi.number().integer().min(1);

export const getNodeSchema = Joi.object({
    id: id.required(),
});

export const createNodeSchema = Joi.object({
    name: name.required(),
    location: location.required(),
});

export const updateNodeSchema = Joi.object({
    id: id.required(),
    name: name,
    location: location,
});

export const toggleRecordingSchema = Joi.object({
    id: id.required(),
});

export const deleteNodeSchema = Joi.object({
    id: id.required(),
});
