import { Model, DataTypes, Sequelize } from 'sequelize';

const CONTACT_TABLE = 'contacts';

const ContactSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    called: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    caller: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
};

class ContactModel extends Model {

    static config(sequelize: Sequelize) {
        return {
            sequelize,
            tableName: CONTACT_TABLE,
            modelName: 'Contact',
            timestamps: true,
        };
    }
}

export { CONTACT_TABLE, ContactSchema, ContactModel };