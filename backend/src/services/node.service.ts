import { Node } from "../models/node.model";
import {
  GetOneNodeDTO,
  CreateNodeDTO,
  UpdateNodeDTO,
  DeleteNodeDTO,
  StartRecordingDTO,
} from "../dtos/node.dto";
import { client } from "../db/config";

import boom from "@hapi/boom";
export class NodeService {
  constructor() {}

  async getNodes(user_id: Node["userId"]): Promise<GetOneNodeDTO[] | string> {
    const nodes = await client.query(
      "SELECT ROW_NUMBER() OVER() id, no.name, no.location, no.status, no.recording FROM nodes no, users us WHERE no.user_id=$1 AND no.user_id = us.iduser",
      [user_id]
    );
    if (!nodes.rows[0]) throw boom.notFound("No nodes found");
    return nodes.rows;
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

  async createNode(userId: Node["userId"], nodeData: CreateNodeDTO) {
    const nodes = await client.query("SELECT * FROM nodes WHERE user_id = $1", [
      userId,
    ]);
    if (nodes.rows.length >= 10)
      throw boom.forbidden("You can't create more than 10 nodes");

    const { name, location } = nodeData;
    const node = await client.query(
      "INSERT INTO nodes (name, location, status, recording, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, location, false, false, new Date(), new Date(), userId]
    );
    return node.rows[0];
  }

  async updateNode(
    nodeNumber: number,
    nodeData: UpdateNodeDTO,
    userId: Node["userId"]
  ): Promise<GetOneNodeDTO | string> {
    const nodeToUpdate = await client.query(
      "SELECT * FROM nodes WHERE user_id = $1 LIMIT 1 OFFSET $2",
      [userId, nodeNumber - 1]
    );

    if (!nodeToUpdate.rows[0]) throw boom.notFound("Node not found");
    if (nodeToUpdate.rows[0].user_id !== userId) throw boom.forbidden("You can't edit this node");
    const updatedNode = {
      ...nodeToUpdate.rows[0],
      ...nodeData,
    };
    const node = await client.query(
      "UPDATE nodes SET name = $1, location = $2, status = $3, updated_at = $4 WHERE idnode = $5 RETURNING *",
      [updatedNode.name, updatedNode.location, updatedNode.status, new Date(), nodeToUpdate.rows[0].idnode]
    );
    return node.rows[0];
  }

  async deleteNode(userId: Node['userId'], nodeNumber: number): Promise<DeleteNodeDTO | string> {
    const nodeToDelete = await client.query(
      "SELECT * FROM nodes WHERE user_id = $1 LIMIT 1 OFFSET $2",
      [userId, nodeNumber - 1]
    );
    if (!nodeToDelete.rows[0]) throw boom.notFound("Node not found");
    if (nodeToDelete.rows[0].user_id !== userId) throw boom.forbidden("You can't edit this node");
    const node = await client.query(
      "DELETE FROM nodes WHERE idnode = $1 RETURNING *",
      [nodeToDelete.rows[0].idnode]
    );
    return {
      id: node.rows[0].idnode,
      name: node.rows[0].name,
    }
  }

  async toggleRecording(
    userId: Node["userId"],
    nodeNumber: number
    ): Promise<StartRecordingDTO | string> {
    const nodeToToggle = await client.query(
      "SELECT * FROM nodes WHERE user_id = $1 LIMIT 1 OFFSET $2",
      [userId, nodeNumber - 1]
    );
    if (!nodeToToggle.rows[0]) throw boom.notFound("Node not found");
    if (nodeToToggle.rows[0].user_id !== userId) throw boom.forbidden("You are not the owner of this node");
    const node = await client.query(
      "UPDATE nodes SET recording = $1, updated_at = $2 WHERE idnode = $3 RETURNING *",
      [!nodeToToggle.rows[0].recording, new Date(), nodeToToggle.rows[0].idnode]
    );
    return node.rows[0];
  }
}
