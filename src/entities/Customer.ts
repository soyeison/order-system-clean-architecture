import { ContactInformationInterface, CustomerInterface } from "../interfaces/entities/customer.interface"
import { Order } from "./Order"

export class Customer implements CustomerInterface {
    id: string
    name: string
    shippingAddress: string
    contactInfo: ContactInformationInterface
    defaultPaymentMethod: string
    orderHistory: Order[]
    
    constructor(
        id: string,
        name: string,
        shippingAddress: string,
        contactInfo: ContactInformationInterface,
        defaultPaymentMethod: string,
        orderHistory: Order[]
    ) {
        this.id = id
        this.name = name
        this.shippingAddress = shippingAddress
        this.contactInfo = contactInfo
        this.defaultPaymentMethod = defaultPaymentMethod
        this.orderHistory = orderHistory
    }
}