import Joi from "joi";

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(30);
const location = Joi.string().min(3).max(30);
const status = Joi.boolean();
const recording = Joi.boolean();
const createdAt = Joi.date();
const updatedAt = Joi.date();

export const createNodeSchema = Joi.object({
    name: name.required(),
    location: location.required(),
    status: status.required(),
    recording: recording.required(),
});

export const getNodeSchema = Joi.object({
    id: id.required(),
});

export const updateNodeSchema = Joi.object({
    id: id.required(),
    name: name,
    location: location,
    status: status,
    recording: recording,
});

export const deleteNodeSchema = Joi.object({
    id: id.required(),
});

export const nodeSchema = Joi.object({
    id: id,
    name: name,
    location: location,
    status: status,
    recording: recording,
    createdAt: createdAt,
    updatedAt: updatedAt,
});