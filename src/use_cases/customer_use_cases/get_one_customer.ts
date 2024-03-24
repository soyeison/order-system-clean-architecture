import { Customer } from "../../entities/Customer";
import { BaseUseCase } from "../../interfaces/use_cases/use_case.interface";
import { customerRepository } from "../../repositories/customer/customer_repository";
import { CreateCustomerImpl, CreateCustomerInput } from "./create_customer";
import { GetAllCustomersImpl } from "./get_all_customers";

export interface GetOneCustomerInput {
    id: string
}

export interface GetOneCustomerOutput {
    customer: Customer
}

export interface GetOneCustomerUseCase extends BaseUseCase<GetOneCustomerInput, GetOneCustomerOutput> {}

export class GetOneCustomerImpl implements GetOneCustomerUseCase {
    async execute(input: GetOneCustomerInput): Promise<GetOneCustomerOutput> {
        const customer = await this.getOneCustomer(input.id)

        return {
            customer
        }
    }

    async getOneCustomer(id: string) {
        const customer = await customerRepository.getOneCustomer(id)

        if (!customer) {
            throw new Error('')
        }

        return customer
    }
}

// Modo de uso
/* (async() => {
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

    const information2: CreateCustomerInput = {
        name: 'Beatriz',
        shippingAddress: 'Cra 56',
        contactInfo: {
            email: 'email2@example.com',
            phoneNumber: '3026493454'
        }
    }


    await newCustomer.execute(information2)

    const customers = new GetAllCustomersImpl()

    const allCostumers = await customers.execute()

    console.log("All customers: ", allCostumers)

    // Buscar el usuario
    const fisrtCustomer = new GetOneCustomerImpl()

    console.log( await fisrtCustomer.getOneCustomer(allCostumers.customers[0].id))
})() */