import { faker } from "@faker-js/faker";
import { Node } from "../models/node.model";
import { GetOneNodeDTO, DeleteNodeDTO, StartRecordingDTO } from "../schemas/node.schema";

export default class NodeService {
  private nodes: Node[] = this.generateNodes(10);
  constructor() {}

  generateNodes(amount: number) {
    const nodes = [];
    for (let i = 0; i < amount; i++) {
      nodes.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        location: faker.address.city(),
        status: faker.datatype.boolean(),
        recording: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }
    return nodes;
  }    

  async getNodes(): Promise<GetOneNodeDTO[] | string > {
    try {
      const nodes = await Promise.resolve(this.nodes).then(
        (nodes: Node[] | []) => nodes
      );
      const data = nodes.map((node) => {
        const { id, name, location, status, recording } = node;
        return { id, name, location, status, recording };
      });
      return data;
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async getNode(nodeId: string) : Promise<GetOneNodeDTO | string> {
    try {
      const node = await Promise.resolve(this.nodes.find((node) => node.id === nodeId)).then(
        (node: Node | undefined) => node
      );
      if (!node) throw new Error("Node not found");
      const { id, name, location, status, recording } = node;
      return { id, name, location, status, recording };
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async deleteNode(nodeId: Node['id']) : Promise<DeleteNodeDTO | string> {
    try {
      const deleteNode = await Promise.resolve(this.nodes.find((node) => node.id === nodeId)).then(
        (node: Node | undefined) => node
      );
      if (!deleteNode) throw new Error("Node not found");
      return deleteNode;
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }

  async startRecording(nodeId: string) : Promise<StartRecordingDTO | string> {
    try {
      const startRecording = await Promise.resolve(this.nodes.find((node) => node.id === nodeId)).then(
        (node: Node | undefined) => node
      );

      if (!startRecording) throw new Error("Node not found");
      if (startRecording.status === false) throw new Error("Node is not online");
      if (startRecording.recording === true) throw new Error("Node is already recording");
      
      startRecording.recording = true;
      return startRecording;
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }
}
