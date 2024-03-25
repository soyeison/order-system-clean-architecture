import { Product } from "../../../entities/Product"
import { BaseUseCase } from "../use_case.interface"

export interface GetOneProductInput {
    id: string
}

export interface GetOneProductOutput {
    product: Product
}

export interface GetOneProductUseCase extends BaseUseCase<GetOneProductInput, GetOneProductOutput> {}