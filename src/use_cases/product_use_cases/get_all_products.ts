import { ProductRepositoryInterface } from "../../interfaces/repositories/product_repository.interface";
import { GetAllProductsOutput, GetAllProductsUseCase } from "../../interfaces/use_cases/product_use_cases/get_all_products";

export class GetAllProductsImpl implements GetAllProductsUseCase {
    constructor(
        private readonly productRepositoryRepo: ProductRepositoryInterface
    ) {}

    async execute(input: void): Promise<GetAllProductsOutput> {
        const products = await this.productRepositoryRepo.getProducts()

        return {
            products
        }
    }
}