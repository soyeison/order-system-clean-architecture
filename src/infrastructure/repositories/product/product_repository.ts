import { Product } from "../../../entities/Product"
import { ProductRepositoryInterface } from "../../../interfaces/repositories/product_repository.interface"
import { ProductDB } from "../../database/storage/product_db"

export class ProductRepository implements ProductRepositoryInterface {
    constructor(private readonly productRepo: ProductDB ) {}

    async addProduct(product: Product): Promise<void> {
        await this.productRepo.addProduct(product)
    }

    async getProducts(): Promise<Product[]> {
        return await this.productRepo.getProducts()
    }

    async getOneProduct(id: string): Promise<Product | undefined> {
        return await this.productRepo.getOneProduct(id)
    }

    async updateProduct(id: string, product: Product): Promise<Product> {
        return await this.productRepo.updateProduct(id, product)
    }
}