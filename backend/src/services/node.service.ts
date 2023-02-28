import boom from "@hapi/boom";

import { Node } from "../models/node.model";
import {
  GetOneNodeDTO,
  CreateNodeDTO,
  UpdateNodeDTO,
  DeleteNodeDTO,
  StartRecordingDTO,
} from "../dtos/node.dto";
import { client } from "../db/config";
export class NodeService {
  constructor() {}

  async getNodes(user_id: Node["userId"]): Promise<GetOneNodeDTO[] | string> {
    try {
      const nodes = await client.query(
        "SELECT no.idnode id, no.name, no.location, no.status, no.recording FROM nodes no, users us WHERE no.user_id=$1 AND no.user_id = us.iduser",
        [user_id]
      );
      return nodes.rows;
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async getNode(nodeId: number): Promise<GetOneNodeDTO | string> {
    try {
      const node = await client.query("SELECT * FROM nodes WHERE idnode = $1", [
        nodeId,
      ]);
      return node.rows[0];
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async createNode(nodeData: CreateNodeDTO): Promise<GetOneNodeDTO | string> {
    // If nodes are less than 10, then the node is created else raise a boom error
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
    nodeId: number,
    nodeData: UpdateNodeDTO
  ): Promise<GetOneNodeDTO | string> {
    try {
      const nodeToUpdate = await client.query(
        "SELECT * FROM nodes WHERE idnode = $1",
        [nodeId]
      );
      if (!nodeToUpdate.rows[0]) throw new Error("Node not found");
      const updatedNode = {
        ...nodeToUpdate.rows[0],
        ...nodeData,
      };
      const node = await client.query(
        "UPDATE nodes SET name = $1, location = $2, updated_at = $3 WHERE idnode = $4 RETURNING *",
        [updatedNode.name, updatedNode.location, new Date(), nodeId]
      );
      return node.rows[0];
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async deleteNode(nodeId: Node["id"]): Promise<DeleteNodeDTO | string> {
    try {
      const nodeToDelete = await client.query(
        "SELECT * FROM nodes WHERE idnode = $1",
        [nodeId]
      );
      if (!nodeToDelete.rows[0]) throw new Error("Node not found");
      const node = await client.query(
        "DELETE FROM nodes WHERE idnode = $1 RETURNING *",
        [nodeId]
      );
      return node.rows[0];
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async toggleRecording(
    nodeId: Node["id"]
  ): Promise<StartRecordingDTO | string> {
    try {
      const nodeToToggle = await client.query(
        "SELECT * FROM nodes WHERE idnode = $1",
        [nodeId]
      );
      if (!nodeToToggle.rows[0]) throw new Error("Node not found");
      const node = await client.query(
        "UPDATE nodes SET status = $1, recording = $2, updated_at = $3 WHERE idnode = $4 RETURNING *",
        [
          !nodeToToggle.rows[0].status,
          !nodeToToggle.rows[0].recording,
          new Date(),
          nodeId,
        ]
      );
      return node.rows[0];
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }
}
