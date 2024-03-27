import { OrderStatus } from "./entities/Order";
import { CustomerDB } from "./infrastructure/database/storage/customer_db";
import { OrderDB } from "./infrastructure/database/storage/order_db";
import { ProductDB } from "./infrastructure/database/storage/product_db";
import { WompiPaymentService } from "./infrastructure/payment/wompi_payment_service";
import { CustomerRepository } from "./infrastructure/repositories/customer/customer_repository";
import { OrderRepository } from "./infrastructure/repositories/order/order_repository";
import { ProductRepository } from "./infrastructure/repositories/product/product_repository";
import { CreateCustomerInput } from "./interfaces/use_cases/customer_use_cases/create_customer";
import { CreateOrderInput } from "./interfaces/use_cases/order_use_cases/create_order";
import { UpdateOrderStatusInput } from "./interfaces/use_cases/order_use_cases/update_order_status";
import { MakePaymentInput } from "./interfaces/use_cases/payment_use_cases/create_payment";
import { CreateProductInput } from "./interfaces/use_cases/product_use_cases/create_product";
import { CreateCustomerImpl } from "./use_cases/customer_use_cases/create_customer";
import { CreateOrderImpl } from "./use_cases/order_use_cases/create_order";
import { UpdateOrderStatusImpl } from "./use_cases/order_use_cases/update_order_status";
import { transitionStrategies } from "./use_cases/order_use_cases/update_order_status/state_transition_strategy_map";
import { MakePaymentImpl } from "./use_cases/payment_use_cases/make_payment";
import { CreateProductImpl } from "./use_cases/product_use_cases/create_product";

(async () => {
    // Iniciar los modelos de la persistencia de datos
    const customerDBInstance = new CustomerDB()
    const productDBInstance = new ProductDB()
    const orderDBInstance = new OrderDB()
    const customerRepositoryIntance = new CustomerRepository(customerDBInstance)
    const productRepositoryInstance = new ProductRepository(productDBInstance)
    const orderRepositoryInstance = new OrderRepository(orderDBInstance)

    // Crear un producto
    const createProductUsecasesInstance = new CreateProductImpl(productRepositoryInstance)

    const productInformation: CreateProductInput = {
        name: 'Camiseta de algodon',
        description: 'Camiseta hecha de algodon',
        price: 10,
        quantityAvailable: 2
    }

    const productCreated = await createProductUsecasesInstance.execute(productInformation)
    console.log(productCreated)
    
    // Creamos un customer
    const createCustomerUsecasesInstance = new CreateCustomerImpl(customerRepositoryIntance)
    
    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452',
            dateOfBirth: new Date('2000/04/03')
        }
    }
    const customerCreated = await createCustomerUsecasesInstance.execute(information)
    console.log(customerCreated)

    // Creamos una orden
    const createOrderUsecasesInstance = new CreateOrderImpl(orderRepositoryInstance)

    const orderInformation: CreateOrderInput = {
        customer: customerCreated.customer,
        products: [productCreated.product]
    }
    const orderCreated = await createOrderUsecasesInstance.execute(orderInformation)
    console.log(orderCreated)

    // Pasar la orden a confirmada realizando el pago
    const updateOrderStatusUsecasesInstance = new UpdateOrderStatusImpl(orderRepositoryInstance, transitionStrategies)
    const wompiServiceInstance = new WompiPaymentService('')
    const generatePaymentUsecaseInstance = new MakePaymentImpl(wompiServiceInstance, orderRepositoryInstance, updateOrderStatusUsecasesInstance)

    const generatePaymentInformation: MakePaymentInput = {
        orderId: orderCreated.order.id,
        paymentDetails: {
            type: 'Tarjeta de crédito',
            cardNumber: '999999999',
            expirationDate: new Date('2024/07/01')
        }
    }
    await generatePaymentUsecaseInstance.execute(generatePaymentInformation)

    // Revisamos en que estado se encuentra la orden
    console.log(await orderDBInstance.getOneOrder(orderCreated.order.id))
})()