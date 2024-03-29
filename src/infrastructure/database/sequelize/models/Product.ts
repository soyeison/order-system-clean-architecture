import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import { ProductInterface } from "../../../../interfaces/entities/product.interface";

export interface ProductAttributes extends ProductInterface {
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface ProductInput extends Optional<ProductAttributes, 'id'> {}

export interface ProductOutput extends Required<ProductAttributes> {}

export class ProductDB extends Model<ProductAttributes, ProductInput> implements ProductAttributes {
    public id!: string;
    public name!: string;
    public description!: string;
    public price!: number;
    public quantityAvailable!: number;
    public readonly createdAt?: Date | undefined;
    public readonly updatedAt?: Date | undefined;
    public readonly deletedAt?: Date | undefined;
}

ProductDB.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantityAvailable: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true
})

export default ProductDB