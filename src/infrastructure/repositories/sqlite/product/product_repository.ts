import { Sequelize } from "sequelize";
import { ProductRepositoryInterface } from "../../../../interfaces/repositories/product_repository.interface";
import { Product } from "../../../../entities/Product";
import { ProductInput } from "../../../database/sequelize/models/Product";

export class ProductRepository implements ProductRepositoryInterface {
    constructor(
        private readonly sequelizeRepo: Sequelize
    ) {}

    async addProduct(product: Product): Promise<void> {
        const adapter: ProductInput = {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantityAvailable: product.quantityAvailable
        }
        await this.sequelizeRepo.models.ProductDB.create(adapter)
    }

    async getProducts(): Promise<Product[]> {
        const productDB = await this.sequelizeRepo.models.ProductDB.findAll()
        return productDB.map((element) => {
            const productJSON: ProductInput = element.toJSON()
            return new Product(
                productJSON.id as string,
                productJSON.name, 
                productJSON.description, 
                productJSON.price,
                productJSON.quantityAvailable,
            )
        })
    }

    async getOneProduct(id: string): Promise<Product | undefined> {
        const productDB = await this.sequelizeRepo.models.ProductDB.findByPk(id)

        if (!productDB) {
            throw new Error('No existe el customer')
        }

        const productJSON: ProductInput = productDB.toJSON()

        return new Product(
            productJSON.id as string,
            productJSON.name, 
            productJSON.description, 
            productJSON.price,
            productJSON.quantityAvailable,
        )
    }

    updateProduct(id: string, product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
}