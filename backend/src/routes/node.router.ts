import express from 'express';
import NodeService from '../services/node.service';

const router = express.Router();
const nodeService = new NodeService();

router.get('/', (req, res) => {
  const nodes = nodeService.getNodes();
  nodes.then((nodes) => {
    res.status(200).send(nodes);
  });
});

export default router;
