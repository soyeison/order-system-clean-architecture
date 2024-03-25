import { Customer } from "../../../entities/Customer"
import { Order } from "../../../entities/Order"
import { Product } from "../../../entities/Product"
import { BaseUseCase } from "../use_case.interface"

export interface CreateOrderInput {
    products: Product[]
    customer: Customer
}

export interface CreateOrderOutput {
    order: Order
}

export interface CreateOrderUseCase extends BaseUseCase<CreateOrderInput, CreateOrderOutput> {}