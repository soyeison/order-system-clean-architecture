import { Customer } from "../../entities/Customer";
import { Order, OrderStatus } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { UUIDGenerator } from "../../infrastructure/utils/uuid_generator";
import { OrderRepositoryInterface } from "../../interfaces/repositories/order_repository.interface";
import { CreateOrderInput, CreateOrderOutput, CreateOrderUseCase } from "../../interfaces/use_cases/order_use_cases/create_order";

export class CreateOrderImpl implements CreateOrderUseCase {
    constructor(private readonly orderRepositoryRepo: OrderRepositoryInterface) {}

    async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
        // Logica para crear una orden
        const order = await this.createOrder(input.products, input.customer)

        await this.orderRepositoryRepo.addOrder(order)
        
        return {
            order
        }
    }

    private async createOrder(products: Product[], customer: Customer): Promise<Order> {
        try {
            const id = UUIDGenerator.generateUUID()
            const totalPrice = this.getTotalPrice(products)
            const newOrder = new Order(id, products, customer, totalPrice, OrderStatus.Pending, new Date)

            return newOrder
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    private getTotalPrice(products: Product[]) {
        return products.reduce((total, products) => total + products.price, 0)
    }
}

// Flujo para la creacion de una orden
/* (async () => {
    const newCustomer = new Customer('', 'Yeison', 'Cra 48', {email: 'example@email.com', phoneNumber: '3023457812'}, 'Cash', [])
    
    const newProduct = new Product('', 'Camiseta', 'Camiseta chevere', 12, 5)
    
    const useCaseOrder = new CreateOrderImpl()
    
    // Ejecutar la creacion de la nueva orden
    console.log("Nueva orden: ", await useCaseOrder.execute({products: [newProduct], customer: newCustomer}))
})() */





