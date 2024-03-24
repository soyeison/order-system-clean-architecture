import { Order } from "../../entities/Order"

export interface ContactInformationInterface {
    email: string
    phoneNumber: string
    dateOfBirth: Date
}

export interface CustomerInterface {
    id: string
    name: string
    shippingAddress: string
    contactInfo: ContactInformationInterface
    defaultPaymentMethod: string
    orderHistory: Order[]
}