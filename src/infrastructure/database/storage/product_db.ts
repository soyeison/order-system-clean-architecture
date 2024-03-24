import { Customer } from "../../../entities/Customer"
import { Product } from "../../../entities/Product"
import { CustomerDBInterface } from "../interfaces/customer_db.interface"
import { ProductDBInterface } from "../interfaces/product_db.interface"

export class ProductDB implements ProductDBInterface {
    private products: Product[]

    constructor() {
        this.products = []
    }

    async addProduct(product: Product): Promise<void> {
        try {
            this.products.push(product)
            console.log("Se pudo agregar el producto correctamente")
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getProducts(): Promise<Product[]> {
        try {
            return this.products
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getOneProduct(id: string): Promise<Product | undefined> {
        try {
            return this.products.find((product) => product.id === id)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async updateProduct(id: string, updatedProduct: Product): Promise<Product> {
        try {
            const index = this.products.findIndex((product) => product.id === id)
            if (index !== -1) {
                this.products[index] = updatedProduct
                return updatedProduct
            } else {
                throw new Error('Produto no encontrado')
            }
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }
    
}