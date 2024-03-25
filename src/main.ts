import { CustomerDB } from "./infrastructure/database/storage/customer_db";
import { CustomerRepository } from "./infrastructure/repositories/customer/customer_repository";
import { CreateCustomerInput } from "./interfaces/use_cases/customer_use_cases/create_customer";
import { CreateCustomerImpl } from "./use_cases/customer_use_cases/create_customer";

(async () => {
    // Iniciar los modelos de la persistencia de datos
    const customerDBInstance = new CustomerDB()
    const customerRepositoryIntance = new CustomerRepository(customerDBInstance)
    
    // Ahora ya tengo el repositorio instanciado
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
    console.log(await createCustomerUsecasesInstance.execute(information))
})()