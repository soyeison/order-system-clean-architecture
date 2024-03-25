import { Product } from "../../entities/Product"

export interface ProductRepositoryInterface {
    addProduct(product: Product): Promise<void>
    getProducts(): Promise<Product[]>
    getOneProduct(id: string): Promise<Product | undefined>
    updateProduct(id: string, product: Product): Promise<Product>
}