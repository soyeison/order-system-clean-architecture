import { Product } from "../../../entities/Product";
import { BaseUseCase } from "../use_case.interface";

export interface GetAllProductsOutput {
    products: Product[]
}

export interface GetAllProductsUseCase extends BaseUseCase<void, GetAllProductsOutput> {}