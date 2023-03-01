import express from "express";
import passport from "passport";

import validatorHandler from "../middlewares/validator.handler";
import { validateTokenAndId } from "../middlewares/auth.handler";

import {
  getNodeSchema,
  createNodeSchema,
  updateNodeSchema,
  deleteNodeSchema,
  toggleRecordingSchema,
} from "../schemas/node.schema";

import { NodeService } from "../services/node.service";

const router = express.Router();
const nodeService = new NodeService();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(getNodeSchema, "params"),
  async (req, res, next) => {
    try {
      const node = await nodeService.getNodes(parseInt(req.params.id));
      res.status(200).send(node);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(createNodeSchema, "body"),
  async (req, res, next) => {
    try {
      const node = await nodeService.createNode(req.body);
      res.status(201).send(node);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(updateNodeSchema, "body"),
  async (req, res, next) => {
    try {
      const node = nodeService.updateNode(parseInt(req.params.id), req.body);
      node.then((node) => {
        res.status(200).send(node);
      });
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/:id/toggle-recording",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(toggleRecordingSchema, "params"),
  async (req, res, next) => {
    try {
      const node = nodeService.toggleRecording(parseInt(req.params.id));
      node.then((node) => {
        res.status(200).send(node);
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateTokenAndId,
  validatorHandler(deleteNodeSchema, "params"),
  async (req, res, next) => {
    try {
      const node = nodeService.deleteNode(parseInt(req.params.id));
      node.then((node) => {
        res.status(200).send(node);
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
