import { Product } from "../../../entities/Product";
import { ProductInterface } from "../../entities/product.interface";
import { BaseUseCase } from "../use_case.interface";

export interface CreateProductInput extends Omit<ProductInterface, 'id'> {}

export interface CreateProductOutput {
    product: Product
}

export interface CreateProductUseCase extends BaseUseCase<CreateProductInput, CreateProductOutput> {}