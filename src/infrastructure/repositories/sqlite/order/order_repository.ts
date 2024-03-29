import { Sequelize } from "sequelize";
import { OrderRepositoryInterface } from "../../../../interfaces/repositories/order_repository.interface";
import { Order } from "../../../../entities/Order";
import { OrderInput } from "../../../database/sequelize/models/Order";
import { CustomerRepositoryInterface } from "../../../../interfaces/repositories/customer_repository.interface";
import { Customer } from "../../../../entities/Customer";

export class OrderRepository implements OrderRepositoryInterface {
    constructor(
        private readonly sequelizeRepo: Sequelize,
        private readonly customerRepo: CustomerRepositoryInterface
    ) {}

    async addOrder(order: Order): Promise<void> {
        const adapter: OrderInput = {
            id: order.id,
            customerId: order.customer.id,
            status: order.status,
            totalPrice: order.totalPrice
        }
        await this.sequelizeRepo.models.OrderDB.create(adapter)
    }

    async getOrders(): Promise<Order[]> {
        const orderDB = await this.sequelizeRepo.models.OrderDB.findAll()
        const orderResp = []
        for (let i = 0; i < orderDB.length; i++) {
            const element = orderDB[i];
            const orderJSON: OrderInput = element.toJSON()
            const customer = await this.customerRepo.getOneCustomer(orderJSON.customerId)
            const orderEntityMapped = new Order(
                orderJSON.id as string,
                [],
                customer as Customer,
                orderJSON.totalPrice,
                orderJSON.status,
                orderJSON.createdAt as Date
            )
            orderResp.push(orderEntityMapped)
        }

        return orderResp
    }

    async getOneOrder(id: string): Promise<Order | undefined> {
        const orderDB = await this.sequelizeRepo.models.OrderDB.findByPk(id)

        if (!orderDB) {
            throw new Error('No existe el customer')
        }

        const orderJSON: OrderInput = orderDB.toJSON()
        const customer = await this.customerRepo.getOneCustomer(orderJSON.customerId)
        return new Order(
            orderJSON.id as string,
            [],
            customer as Customer,
            orderJSON.totalPrice,
            orderJSON.status,
            orderJSON.createdAt as Date
        )
    }

    async updateOrder(id: string, order: Order): Promise<Order> {
        const orderDB = await this.sequelizeRepo.models.OrderDB.findByPk(id)

        if (!orderDB) {
            throw new Error('No existe el customer')
        }

        const orderUpdated = await orderDB.update(order)
        const orderJSON: OrderInput = orderUpdated.toJSON()
        const customer = await this.customerRepo.getOneCustomer(orderJSON.customerId)
        return new Order(
            orderJSON.id as string,
            [],
            customer as Customer,
            orderJSON.totalPrice,
            orderJSON.status,
            orderJSON.createdAt as Date
        )
    }
}