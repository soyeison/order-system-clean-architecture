import { PaymentDetails } from "../../../interfaces/entities/payment_details";
import { PaymentResult } from "../../../interfaces/entities/payment_result";

export interface PaymentGatewayService {
    processPayment(paymentDetails: PaymentDetails): Promise<PaymentResult>
}