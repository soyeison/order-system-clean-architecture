
import { CustomerDB } from "./infrastructure/database/memory/storage/customer_db";
import { OrderDB } from "./infrastructure/database/memory/storage/order_db";
import { ProductDB } from "./infrastructure/database/memory/storage/product_db";
import sequelizeConnection from "./infrastructure/database/sequelize/config";
import dbInit from "./infrastructure/database/sequelize/init";
import { WompiPaymentService } from "./infrastructure/payment/wompi_payment_service";
import { CustomerRepository } from "./infrastructure/repositories/sqlite/customer/customer_repository";
import { OrderRepository } from "./infrastructure/repositories/sqlite/order/order_repository";
import { ProductRepository } from "./infrastructure/repositories/sqlite/product/product_repository";
import { CreateCustomerInput } from "./interfaces/use_cases/customer_use_cases/create_customer";
import { CreateOrderInput } from "./interfaces/use_cases/order_use_cases/create_order";
import { MakePaymentInput } from "./interfaces/use_cases/payment_use_cases/create_payment";
import { CreateProductInput } from "./interfaces/use_cases/product_use_cases/create_product";
import { CreateCustomerImpl } from "./use_cases/customer_use_cases/create_customer";
import { GetAllCustomersImpl } from "./use_cases/customer_use_cases/get_all_customers";
import { GetOneCustomerImpl } from "./use_cases/customer_use_cases/get_one_customer";
import { CreateOrderImpl } from "./use_cases/order_use_cases/create_order";
import { UpdateOrderStatusImpl } from "./use_cases/order_use_cases/update_order_status";
import { transitionStrategies } from "./use_cases/order_use_cases/update_order_status/state_transition_strategy_map";
import { MakePaymentImpl } from "./use_cases/payment_use_cases/make_payment";
import { CreateProductImpl } from "./use_cases/product_use_cases/create_product";

(async () => {
    // Iniciar los modelos de la persistencia de datos en memoria
    /* const customerDBInstance = new CustomerDB()
    const productDBInstance = new ProductDB()
    const orderDBInstance = new OrderDB()
    const customerRepositoryIntance = new CustomerRepository(customerDBInstance)
    const productRepositoryInstance = new ProductRepository(productDBInstance)
    const orderRepositoryInstance = new OrderRepository(orderDBInstance) */

    // Iniciar los modelos de la persistencia de datos en memoria
    await dbInit()
    const customerRepositoryIntance = new CustomerRepository(sequelizeConnection)
    const productRepositoryInstance = new ProductRepository(sequelizeConnection)
    const orderRepositoryInstance = new OrderRepository(sequelizeConnection, customerRepositoryIntance)

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
    console.log(await orderRepositoryInstance.getOneOrder(orderCreated.order.id))
})()