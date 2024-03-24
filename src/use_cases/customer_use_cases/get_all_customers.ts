import { Customer } from "../../entities/Customer";
import { BaseUseCase } from "../../interfaces/use_cases/use_case.interface";
import { customerRepository } from "../../repositories/customer/customer_repository";
import { CreateCustomerImpl, CreateCustomerInput } from "./create_customer";

export interface GetAllCustomersOutput {
    customers: Customer[]
}

export interface GetAllCustomersUseCase extends BaseUseCase<void, GetAllCustomersOutput> {} 

export class GetAllCustomersImpl implements GetAllCustomersUseCase {
    async execute(input: void): Promise<GetAllCustomersOutput> {
        const customers = await customerRepository.getCustomers()

        return {
            customers
        }
    }
    
}

// Modo de uso

/* (async () => {
    const newCustomer = new CreateCustomerImpl()
    
    const information: CreateCustomerInput = {
        name: 'Yeison',
        shippingAddress: 'Cra 48',
        contactInfo: {
            email: 'email@example.com',
            phoneNumber: '3026493452'
        }
    }


    await newCustomer.execute(information)

    // Habiendo ya informacion almacenada veamos como funciona el metodo para obtenerlos todos
    const customers = new GetAllCustomersImpl()

    console.log("All customers: ", await customers.execute())
})() */