import {v4 as uuidv4} from 'uuid';

import { Customer } from "../../entities/Customer";
import { BaseUseCase } from "../../interfaces/use_cases/use_case.interface";
import { customerRepository } from "../../repositories/customer/customer_repository";

export interface CreateCustomerInput {
    name: string;
    shippingAddress: string;
    contactInfo: {
        email: string;
        phoneNumber: string;
    };
}

export interface CreateCustomerOutput {
    customer: Customer
}

export interface CreateCustomerUseCase extends BaseUseCase<CreateCustomerInput, CreateCustomerOutput> {}

export class CreateCustomerImpl implements CreateCustomerUseCase {
    async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
        const customer = await this.createCustomer(input)

        // Guardar este customer en memoria
        customerRepository.addCustomer(customer)

        return {
            customer
        }
    }

    private async createCustomer(input: CreateCustomerInput): Promise<Customer> {
        try {
            const id = this.generateUUID()
            const newCustomer = new Customer(id, input.name, input.shippingAddress, {email: input.contactInfo.email, phoneNumber: input.contactInfo.phoneNumber}, 'Cash', [])
            return newCustomer
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear el customer')
        }
    }

    private generateUUID() {
        return uuidv4();
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

    const information2: CreateCustomerInput = {
        name: 'Beatriz',
        shippingAddress: 'Cra 56',
        contactInfo: {
            email: 'email2@example.com',
            phoneNumber: '3026493454'
        }
    }


    await newCustomer.execute(information2)
    
    console.log("Consultar el customer creado", await customerRepository.getCustomers())
})() */