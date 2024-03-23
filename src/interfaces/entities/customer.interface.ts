import { Order } from "../../entities/Order"

export interface ContactInformationInterface {
    email: string
    phoneNumber: string
}

export interface CustomerInterface {
    id: string
    name: string
    shippingAddress: string
    contactInfo: ContactInformationInterface
    defaultPaymentMethod: string
    orderHistory: Order[]
}