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
      "SELECT no.idnode id, no.name, no.location, no.status, no.recording FROM nodes no, users us WHERE no.user_id=$1 AND no.user_id = us.iduser",
      [user_id]
    );
    if (!nodes.rows[0]) throw boom.notFound("No nodes found");
    return nodes.rows;
  }

  async getNode(nodeId: number): Promise<GetOneNodeDTO | string> {
    const node = await client.query(
      "SELECT no.idnode id, no.name, no.location, no.status, no.recording FROM nodes no, users us WHERE no.idnode=$1 AND no.user_id = us.iduser",
      [nodeId]
    );
    if (!node.rows[0]) throw boom.notFound("Node not found");
    return node.rows[0];
  }

  async createNode(nodeData: CreateNodeDTO): Promise<GetOneNodeDTO | string> {
    const nodes = await client.query("SELECT * FROM nodes WHERE user_id = $1", [
      nodeData.userId,
    ]);
    if (nodes.rows.length >= 10)
      throw boom.forbidden("You can't create more than 10 nodes");

    const { name, location, userId } = nodeData;
    const node = await client.query(
      "INSERT INTO nodes (name, location, status, recording, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, location, false, false, new Date(), new Date(), userId]
    );
    return node.rows[0];
  }

  async updateNode(
    nodeId: Node["id"],
    nodeData: UpdateNodeDTO,
    userId: Node["userId"]
  ): Promise<GetOneNodeDTO | string> {
    const nodeToUpdate = await client.query(
      "SELECT * FROM nodes WHERE idnode = $1",
      [nodeId]
    );

    if (!nodeToUpdate.rows[0]) throw boom.notFound("Node not found");
    if (nodeToUpdate.rows[0].user_id !== userId) throw boom.forbidden("You can't edit this node");
    const updatedNode = {
      ...nodeToUpdate.rows[0],
      ...nodeData,
    };
    const node = await client.query(
      "UPDATE nodes SET name = $1, location = $2, updated_at = $3 WHERE idnode = $4 RETURNING *",
      [updatedNode.name, updatedNode.location, new Date(), nodeId]
    );
    return node.rows[0];
  }

  async deleteNode(userId: Node['userId'], nodeId: Node["id"]): Promise<DeleteNodeDTO | string> {
    const nodeToDelete = await client.query(
      "SELECT * FROM nodes WHERE idnode = $1",
      [nodeId]
    );
    if (!nodeToDelete.rows[0]) throw boom.notFound("Node not found");
    if (nodeToDelete.rows[0].user_id !== userId) throw boom.forbidden("You can't edit this node");
    const node = await client.query(
      "DELETE FROM nodes WHERE idnode = $1 RETURNING *",
      [nodeId]
    );
    return {
      id: node.rows[0].idnode,
      name: node.rows[0].name,
    }
  }

  async toggleRecording(
    userId: Node["userId"],
    nodeId: Node["id"]
    ): Promise<StartRecordingDTO | string> {
    const nodeToToggle = await client.query(
      "SELECT * FROM nodes WHERE idnode = $1",
      [nodeId]
    );
    if (!nodeToToggle.rows[0]) throw boom.notFound("Node not found");
    if (nodeToToggle.rows[0].user_id !== userId) throw boom.forbidden("You are not the owner of this node");
    const node = await client.query(
      "UPDATE nodes SET recording = $1, updated_at = $2 WHERE idnode = $3 RETURNING *",
      [!nodeToToggle.rows[0].recording, new Date(), nodeId]
    );
    return node.rows[0];
  }
}
