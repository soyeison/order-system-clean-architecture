import { Product } from '../../entities/Product';
import { CreateProductInput, CreateProductOutput, CreateProductUseCase } from '../../interfaces/use_cases/product_use_cases/create_product';
import { UUIDGenerator } from '../../infrastructure/utils/uuid_generator';
import { ProductRepository } from '../../repositories/product/product_repository';

export class CreateProductImpl implements CreateProductUseCase {
    constructor(
        private readonly productRepositoryRepo: ProductRepository 
    ) {}

    async execute(input: CreateProductInput): Promise<CreateProductOutput> {
        const product = await this.createProduct(input)

        await this.productRepositoryRepo.addProduct(product)

        return {
            product
        }
    }
    
    private async createProduct(input: CreateProductInput) {
        try {
            const id = UUIDGenerator.generateUUID()
            const newProduct = new Product(
                id,
                input.name,
                input.description,
                input.price,
                input.quantityAvailable,
            )
            return newProduct
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear el producto')
        }
    }
}