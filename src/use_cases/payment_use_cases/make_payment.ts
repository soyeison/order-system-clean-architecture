import { OrderStatus } from "../../entities/Order"
import { PaymentGatewayService } from "../../infrastructure/payment/interfaces/payment_gateway_service.interface"
import { OrderRepositoryInterface } from "../../interfaces/repositories/order_repository.interface"
import { UpdateOrderStatusInput, UpdateOrderStatusUseCase } from "../../interfaces/use_cases/order_use_cases/update_order_status"
import { MakePaymentInput, MakePaymentUseCase } from "../../interfaces/use_cases/payment_use_cases/create_payment"

export class MakePaymentImpl implements MakePaymentUseCase {
    constructor(
        private readonly paymentGatewayService: PaymentGatewayService,
        private readonly orderRepositoryRepo: OrderRepositoryInterface,
        private readonly updateOrderStatusUseCase: UpdateOrderStatusUseCase
    ) {}

    async execute(input: MakePaymentInput): Promise<void> {
        try {
            const order = await this.orderRepositoryRepo.getOneOrder(input.orderId)
    
            if (!order || order.status !== OrderStatus.Pending) {
                throw new Error('La orden no esta disponible para pago')
            }
    
            // Procesar el pago
            const paymentResult = await this.paymentGatewayService.processPayment(input.paymentDetails)
    
            if (paymentResult.success) {
                const changeStatusInput: UpdateOrderStatusInput = {
                    orderId: input.orderId,
                    newStatus: OrderStatus.Confirmed
                }
                await this.updateOrderStatusUseCase.execute(changeStatusInput)
            } else {
                throw new Error('El pago no pudo ser procesado')
            }
        } catch (error) {
            console.log('Error al procesar el pago: ', error)
            throw error
        }
    }
}