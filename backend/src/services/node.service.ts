import { Node } from "../models/node.model";
import {
  GetOneNodeDTO,
  CreateNodeDTO,
  UpdateNodeDTO,
  DeleteNodeDTO,
} from "../dtos/node.dto";
import { client } from "../db/config";

import boom from "@hapi/boom";
export class NodeService {
  constructor() {}

  async getNodes(user_id: Node["userId"]): Promise<GetOneNodeDTO[] | string> {
    const nodes = await client.query(
      "SELECT ROW_NUMBER() OVER(ORDER BY idnode) id, no.name, no.location, no.status, no.recording FROM nodes no, users us WHERE no.user_id=$1 AND no.user_id = us.iduser ORDER BY idnode",
      [user_id]
    );
    if (!nodes.rows[0]) throw boom.notFound("No nodes found");
    return nodes.rows.map((node) => ({
      id: parseInt(node.id),
      name: node.name,
      location: node.location,
      status: node.status,
      recording: node.recording,
    }));
  }

  async getNode(userId: Node["userId"], nodeNumber: number): Promise<GetOneNodeDTO | string> {
    const node = await client.query(
      "SELECT no.name, no.location, no.status, no.recording FROM nodes no, users us WHERE no.user_id=$1 AND no.user_id = us.iduser LIMIT 1 OFFSET $2",
      [userId, nodeNumber - 1]
    );
    console.log(node.rows[0]);
    if (!node.rows[0]) throw boom.notFound("Node not found");
    return {
      id: nodeNumber,
      ...node.rows[0]
    }
  }

  async createNode(userId: Node["userId"], nodeData: CreateNodeDTO): Promise<GetOneNodeDTO | string> {
    const nodes = await client.query("SELECT * FROM nodes WHERE user_id = $1", [
      userId,
    ]);
    if (nodes.rows.length >= 10)
      throw boom.forbidden("You can't create more than 10 nodes");

    if (nodes.rows.find((node) => node.name === nodeData.name)) throw boom.conflict('You already have a node called ' + nodeData.name);
    const { name, location } = nodeData;
    const node = await client.query(
      "INSERT INTO nodes (name, location, status, recording, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, location, false, false, new Date(), new Date(), userId]
    );

    delete node.rows[0].idnode;
    delete node.rows[0].user_id;

    return {
      id: nodes.rows.length + 1,
      name: node.rows[0].name,
      location: node.rows[0].location,
      status: node.rows[0].status,
      recording: node.rows[0].recording,
    }
  }

  async updateNode(
    nodeNumber: number,
    nodeData: UpdateNodeDTO,
    userId: Node["userId"]
  ): Promise<GetOneNodeDTO | string> {
    const nodes = await client.query("SELECT name FROM nodes WHERE user_id = $1", [
      userId,
    ]);

    if (nodes.rows.find((node) => node.name === nodeData.name)) throw boom.conflict('You already have a node called ' + nodeData.name);

    const nodeToUpdate = await client.query(
      "SELECT no.idnode id, no.name, no.location, no.status, no.recording FROM nodes no WHERE no.user_id = $1 ORDER BY idnode LIMIT 1 OFFSET $2",
      [userId, nodeNumber - 1]
    );

    if (!nodeToUpdate.rows[0]) throw boom.notFound("Node not found");
    const updatedNode = {
      ...nodeToUpdate.rows[0],
      ...nodeData,
    };
    const node = await client.query(
      "UPDATE nodes SET name = $1, location = $2, status = $3, updated_at = $4 WHERE idnode = $5 RETURNING *",
      [updatedNode.name, updatedNode.location, updatedNode.status, new Date(), nodeToUpdate.rows[0].id]
    );

    delete node.rows[0].idnode;
    delete node.rows[0].user_id;

    return {
      id: nodeNumber,
      name: node.rows[0].name,
      location: node.rows[0].location,
      status: node.rows[0].status,
      recording: node.rows[0].recording,
    }
  }

  async deleteNode(userId: Node['userId'], nodeNumber: number): Promise<DeleteNodeDTO | string> {
    console.log(userId, nodeNumber)
    const nodeToDelete = await client.query(
      "SELECT no.idnode id, no.name, no.location, no.status, no.recording FROM nodes no WHERE no.user_id = $1 ORDER BY idnode LIMIT 1 OFFSET $2",
      [userId, nodeNumber - 1]
    );
    if (!nodeToDelete.rows[0]) throw boom.notFound("Node not found");

    const node = await client.query(
      "DELETE FROM nodes WHERE idnode = $1 RETURNING *",
      [nodeToDelete.rows[0].id]
    );
    return {
      id: node.rows[0].id,
      name: node.rows[0].name,
    }
  }
}
