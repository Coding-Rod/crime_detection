import express from 'express';
import NodeService from '../services/node.service';

import validatorHandler from '../middlewares/validator.handler';
import { getNodeSchema, createNodeSchema, updateNodeSchema, deleteNodeSchema, toggleRecordingSchema } from '../schemas/node.schema';

const router = express.Router();
const nodeService = new NodeService();

router.get('/',
 (req, res) => {
  const nodes = nodeService.getNodes();
  nodes.then((nodes) => {
    res.status(200).send(nodes);
  });
});


router.get('/:id',
  validatorHandler(getNodeSchema, 'params'),
  (req, res) => {
    const node = nodeService.getNode(parseInt(req.params.id));
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

router.post('/',
  validatorHandler(createNodeSchema, 'body'),
  (req, res) => {
    const node = nodeService.createNode(req.body);
    node.then((node) => {
      res.status(201).send(node);
    });
  }
);

router.patch('/:id',
  validatorHandler(updateNodeSchema, 'body'),
  (req, res) => {
    const node = nodeService.updateNode(parseInt(req.params.id), req.body);
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

router.patch('/:id/toggle-recording',
  validatorHandler(toggleRecordingSchema, 'body'),
  (req, res) => {
    const node = nodeService.toggleRecording(parseInt(req.params.id), req.body);
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

router.delete('/:id',
  validatorHandler(deleteNodeSchema, 'params'),
  (req, res) => {
    const node = nodeService.deleteNode(parseInt(req.params.id));
    node.then((node) => {
      res.status(200).send(node);
    });
  }
);

export default router;
