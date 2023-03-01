import express from "express";
import passport from "passport";

import validatorHandler from "../middlewares/validator.handler";

import {
  getNodeSchema,
  createNodeSchema,
  updateNodeSchema,
  deleteNodeSchema,
  toggleRecordingSchema,
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
      console.log(id);
      const node = await nodeService.getNodes(parseInt(id));
      res.status(200).send(node);
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
      const node = await nodeService.createNode(req.body);
      res.status(201).send(node);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateNodeSchema, "body"),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
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
  "/toggle-recording",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const node = nodeService.toggleRecording(parseInt(id));
      node.then((node) => {
        res.status(200).send(node);
      });
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const id = await getId(req.headers.authorization as string);
      const node = nodeService.deleteNode(parseInt(id));
      node.then((node) => {
        res.status(200).send(node);
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
