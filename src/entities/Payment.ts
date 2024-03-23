import { PaymentInterface } from "../interfaces/entities/payment.interface";

export class Payment implements PaymentInterface {
    id: number;
    type: string;
    cardNumber: string;
    expirationDate: string;

    constructor(id: number, type: string, cardNumber: string, expirationDate: string) {
        this.id = id;
        this.type = type;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
    }
}