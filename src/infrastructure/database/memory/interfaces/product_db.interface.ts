import { Product } from "../../../entities/Product"

export interface ProductDBInterface {
    addProduct(product: Product): Promise<void>
    getProducts(): Promise<Product[]>
    getOneProduct(id: string): Promise<Product | undefined>
    updateProduct(id: string, updatedProduct: Product): Promise<Product>
}