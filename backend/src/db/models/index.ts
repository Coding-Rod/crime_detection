import { Sequelize } from "sequelize";

import { UserModel, UserSchema } from "./user.model";
import { NodeModel, NodeSchema } from "./node.model";
import { ContactModel, ContactSchema } from "./contact.model";

const setupModels = (sequelize: Sequelize) => {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  NodeModel.init(NodeSchema, NodeModel.config(sequelize));
  ContactModel.init(ContactSchema, ContactModel.config(sequelize));
}

export { setupModels };