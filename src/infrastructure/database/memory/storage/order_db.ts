
import { Order } from "../../../../entities/Order";
import { OrderDBInterface } from "../interfaces/order_db.interface";

export class OrderDB implements OrderDBInterface {
    private orders: Order[]

    constructor() {
        this.orders = []
    }

    async addOrder(order: Order): Promise<void> {
        try {
            this.orders.push(order)
            console.log('Se pudo agregar la orden correctamente')
        } catch (error) {
            console.log(error)
            throw new Error('');
        }
    }

    async getOrders(): Promise<Order[]> {
        try {
            return this.orders
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getOneOrder(id: string): Promise<Order | undefined> {
        try {
            return this.orders.find((order) => order.id === id)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async updateOrder(id: string, updatedOrder: Order): Promise<Order> {
        try {
            const index = this.orders.findIndex((order) => order.id === id)
            if (index !== -1) {
                this.orders[index] = updatedOrder
                return updatedOrder
            } else {
                throw new Error('Cliente no encontrado')
            }
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

}