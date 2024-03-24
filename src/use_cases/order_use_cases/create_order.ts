import { Customer } from "../../entities/Customer";
import { Order, OrderStatus } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { BaseUseCase } from "../../interfaces/use_cases/use_case.interface";

export interface CreateOrderInput {
    products: Product[]
    customer: Customer
}

export interface CreateOrderOutput {
    order: Order
}

export interface CreateOrderUseCase extends BaseUseCase<CreateOrderInput, CreateOrderOutput> {}

export class CreateOrderImpl implements CreateOrderUseCase {
    async execute(input: CreateOrderInput): Promise<CreateOrderOutput> {
        // Logica para crear una orden
        const order = await this.createOrder(input.products, input.customer)
        return {
            order
        }
    }

    private async createOrder(products: Product[], customer: Customer): Promise<Order> {
        try {
            // Calcular el total de la orden
            const totalPrice = products.reduce((total, products) => total + products.price, 0)
            const newOrder = new Order('', products, customer, totalPrice, OrderStatus.Pending, new Date)

            return newOrder
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
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





