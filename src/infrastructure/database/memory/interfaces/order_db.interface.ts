import { Order } from "../../../../entities/Order"


export interface OrderDBInterface {
    addOrder(order: Order): Promise<void>
    getOrders(): Promise<Order[]>
    getOneOrder(id: string): Promise<Order | undefined>
    updateOrder(id: string, updatedOrder: Order): Promise<Order>
}