import { ProductRepositoryInterface } from "../../interfaces/repositories/product_repository.interface";
import { GetOneProductInput, GetOneProductOutput, GetOneProductUseCase } from "../../interfaces/use_cases/product_use_cases/get_one_product";

export class GetOneProductImpl implements GetOneProductUseCase {
    constructor(
        private readonly productRepositoryRepo: ProductRepositoryInterface
    ) {}

    async execute(input: GetOneProductInput): Promise<GetOneProductOutput> {
        const product = await this.getOneCustomer(input.id)

        return {
            product
        }
    }

    async getOneCustomer(id: string) {
        const product = await this.productRepositoryRepo.getOneProduct(id)

        if (!product) {
            throw new Error('')
        }

        return product
    }
}