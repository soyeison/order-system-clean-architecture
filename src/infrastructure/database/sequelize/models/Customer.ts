import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import { CustomerInterface } from "../../../../interfaces/entities/customer.interface";

export interface CustomerAttributes {
    id: string;
    name: string;
    shippingAddress: string
    email: string
    phoneNumber: string
    dateOfBirth: Date
    defaultPaymentMethod: string
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface CustomerInput extends Optional<CustomerAttributes, 'id'> {}

export interface CustomerOutput extends CustomerInterface {}

export class CustomerDB extends Model<CustomerAttributes, CustomerInput> implements CustomerAttributes {
    public id!: string;
    public name!: string;
    public shippingAddress!: string;
    public email!: string;
    public phoneNumber!: string;
    public dateOfBirth!: Date;
    public defaultPaymentMethod!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

CustomerDB.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    defaultPaymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default CustomerDB