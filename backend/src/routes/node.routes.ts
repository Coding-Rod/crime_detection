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

const router = express.Router();
const nodeService = new NodeService();

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getNodeSchema, "params"),
  (req, res) => {
    const nodes = nodeService.getNodes(parseInt(req.params.id));
    nodes.then((nodes) => {
      res.status(200).send(nodes);
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createNodeSchema, "body"),
  (req, res) => {
    const node = nodeService.createNode(req.body);
    node.then((node) => {
      res.status(201).send(node);
    });
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateNodeSchema, "body"),
  (req, res) => {
    const node = nodeService.updateNode(parseInt(req.params.id), req.body);
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

router.patch(
  "/:id/toggle-recording",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(toggleRecordingSchema, "params"),
  (req, res) => {
    const node = nodeService.toggleRecording(parseInt(req.params.id));
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(deleteNodeSchema, "params"),
  (req, res) => {
    const node = nodeService.deleteNode(parseInt(req.params.id));
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

export default router;
