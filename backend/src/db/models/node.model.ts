import { Model, DataTypes, Sequelize } from 'sequelize';

const NODE_TABLE = 'nodes';

const NodeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    location: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    recording: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
};

class NodeModel extends Model {
    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: NODE_TABLE,
            modelName: 'Node',
            timestamps: true,
        };
    }
}

export { NODE_TABLE, NodeSchema, NodeModel };