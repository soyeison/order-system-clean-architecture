import { Product } from "../../entities/Product"
import { ProductDB, productDBInstance } from "../../infrastructure/database/storage/product_db"

export interface ProductRepositoryInterface {
    addProduct(product: Product): Promise<void>
    getProducts(): Promise<Product[]>
    getOneProduct(id: string): Promise<Product | undefined>
    updateProduct(id: string, product: Product): Promise<Product>
}

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

export const productRepository = new ProductRepository(productDBInstance)