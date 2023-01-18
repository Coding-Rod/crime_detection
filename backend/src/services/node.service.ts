import { faker } from "@faker-js/faker";
import { Node } from "../models/node.model";

export default class NodeService {
  private nodes: Node[] = this.generateNodes(10);
  constructor() {
    this.nodes = this.generateNodes(10);
  }

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

  async getNodes() {
    try {
      const nodes = await Promise.resolve(this.nodes).then(
        (nodes: Node[]) => nodes
      );
      return nodes;
    } catch (err) {
      console.error(err);
    }
  }

  async getNode(nodeId: string) {
    try {
      const node = await Promise.resolve("node").then((node: string) => node);
      return node;
    } catch (err) {
      console.error(err);
    }
  }

  async deleteNode(nodeId: string) {
    try {
      const deleteNode = await Promise.resolve("deleteNode").then(
        (deleteNode: any) => deleteNode
      );
      return deleteNode;
    } catch (err) {
      console.error(err);
    }
  }

  async startRecording(nodeId: string) {
    try {
      const startRecording = await Promise.resolve("startRecording").then(
        (startRecording: any) => startRecording
      );
      return startRecording;
    } catch (err) {
      console.error(err);
    }
  }
}
