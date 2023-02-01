import { faker } from "@faker-js/faker";
import { Node } from "../models/node.model";
import { GetOneNodeDTO, DeleteNodeDTO, StartRecordingDTO } from "../dtos/node.dto";

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

  async createNode(nodeData: Node) : Promise<GetOneNodeDTO | string> {
    try {
      const { name, location } = nodeData;
      const newNode = {
        id: faker.datatype.uuid(),
        name,
        location,
        status: faker.datatype.boolean(),
        recording: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };
      this.nodes.push(newNode);
      const { id, status, recording } = newNode;
      return { id, name, location, status, recording };
    } catch (err) {
      console.error(err);
      return err as string;
    }
  }
  

  async updateNode(nodeId: string, nodeData: Node) : Promise<GetOneNodeDTO | string> {
    try {
      const node = await Promise.resolve(this.nodes.find((node) => node.id === nodeId)).then(
        (node: Node | undefined) => node
      );
      if (!node) throw new Error("Node not found");
      const { name, location } = nodeData;
      const updatedNode = { ...node, name, location };
      return updatedNode;
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

  async toggleRecording(nodeId: Node['id'], recording: Node['recording']) : Promise<StartRecordingDTO | string> {
    try {
      const node = await Promise.resolve(this.nodes.find((node) => node.id === nodeId)).then(
        (node: Node | undefined) => node
      );
      if (!node) throw new Error("Node not found");
      const { recording } = node;
      const updatedNode = { ...node, recording };
      return updatedNode;
    }
    catch (err) {
      console.error(err);
      return err as string;
    }
  }
}
