import { OrderStatus } from "../../../entities/Order"
import { PaymentInterface } from "../../entities/payment.interface"
import { PaymentDetails } from "../../entities/payment_details"
import { OrderRepositoryInterface } from "../../repositories/order_repository.interface"
import { UpdateOrderStatusInput, UpdateOrderStatusUseCase } from "../order_use_cases/update_order_status"
import { BaseUseCase } from "../use_case.interface"

export interface MakePaymentInput {
    orderId: string
    paymentDetails: PaymentDetails
}

export interface MakePaymentUseCase extends BaseUseCase<MakePaymentInput, void> {}