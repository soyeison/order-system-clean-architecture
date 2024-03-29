import { Order } from "../../../../entities/Order"
import { OrderRepositoryInterface } from "../../../../interfaces/repositories/order_repository.interface"
import { OrderDB } from "../../../database/memory/storage/order_db"



export class OrderRepository implements OrderRepositoryInterface {
    constructor(private readonly orderRepo: OrderDB) {}

    async addOrder(order: Order): Promise<void> {
        await this.orderRepo.addOrder(order)
    }

    async getOrders(): Promise<Order[]> {
        return await this.orderRepo.getOrders()
    }

    async getOneOrder(id: string): Promise<Order | undefined> {
        return await this.orderRepo.getOneOrder(id)
    }
    
    async updateOrder(id: string, order: Order): Promise<Order> {
        return await this.orderRepo.updateOrder(id, order)
    }
}