import { Order, OrderStatus } from "../../../entities/Order"
import { BaseUseCase } from "../use_case.interface"

export interface UpdateOrderStatusInput {
    orderId: string
    newStatus: OrderStatus
}

export interface UpdateOrderStatusOutput {
    order: Order
}

export interface UpdateOrderStatusUseCase extends BaseUseCase<UpdateOrderStatusInput, UpdateOrderStatusOutput> {}