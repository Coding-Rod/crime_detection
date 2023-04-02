import express from "express";
import passport from "passport";

import validatorHandler from "../middlewares/validator.handler";

import {
  createNodeSchema,
  updateNodeSchema
} from "../schemas/node.schema";

import { NodeService } from "../services/node.service";
import { getId } from "../utils/db/getId";

const router = express.Router();
const nodeService = new NodeService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      res.status(200).send(req.query.id
        ? await nodeService.getNode(id, parseInt(req.query.id as string))
        : await nodeService.getNodes(id));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createNodeSchema, "body"),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      res.status(201).send(await nodeService.createNode(id, req.body));
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateNodeSchema, "body"),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      res.status(200).send(await nodeService.updateNode(parseInt(req.params.id), req.body, id));
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      res.status(200).send(await nodeService.deleteNode(id, parseInt(req.params.id)));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
