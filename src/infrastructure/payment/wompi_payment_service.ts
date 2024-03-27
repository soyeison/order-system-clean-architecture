import { PaymentDetails } from "../../interfaces/entities/payment_details"
import { PaymentResult } from "../../interfaces/entities/payment_result"
import { PaymentGatewayService } from "./interfaces/payment_gateway_service.interface"

export class WompiPaymentService implements PaymentGatewayService {
    private apiKey: string

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async processPayment(paymentDetails: PaymentDetails): Promise <PaymentResult> {
        try {
            const response = {
                status: 200,
                data: {
                    status: 'APROVED'
                }
            }

            if (response.status === 200 && response.data.status === 'APROVED') {
                return { success: true }
            } else {
                return { success: false, errorMessage: 'Pago rechazado por Wompi'}
            }
        } catch (error) {
            console.error('Error al procesar el pago con Wompi: ', error)
            return { success: false, errorMessage: 'Error al procesar el pago'}
        }
    }
}