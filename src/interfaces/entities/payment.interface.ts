export interface PaymentInterface {
    id: number;
    type: string; // Por ejemplo: "Tarjeta de crédito", "Transferencia bancaria", etc.
    cardNumber: string;
    expirationDate: Date;
}