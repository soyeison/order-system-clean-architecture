import { Order } from "../../entities/Order"

export interface OrderRepositoryInterface {
    addOrder(order: Order): Promise<void>
    getOrders(): Promise<Order[]>
    getOneOrder(id: string): Promise<Order | undefined>
    updateOrder(id: string, order: Order): Promise<Order>
}