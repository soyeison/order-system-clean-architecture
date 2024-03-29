import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import { CustomerInterface } from "../../../../interfaces/entities/customer.interface";
import { OrderStatus } from "../../../../entities/Order";

export interface OrderAttributes {
    id: string;
    customerId: string;
    totalPrice: number;
    status: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface OrderInput extends Optional<OrderAttributes, 'id'> {}

export interface OrderOutput extends OrderAttributes {}

export class OrderDB extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
    public id!: string;
    public customerId!: string;
    public totalPrice!: number;
    public status!: OrderStatus;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

OrderDB.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(...Object.values(OrderStatus)),
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default OrderDB