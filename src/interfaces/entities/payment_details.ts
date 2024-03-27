import { PaymentInterface } from "./payment.interface";

export interface PaymentDetails extends Omit<PaymentInterface, 'id'> {}