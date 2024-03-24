import {v4 as uuidv4} from 'uuid';

import { Customer } from "../../entities/Customer";
import { customerRepository } from "../../repositories/customer/customer_repository";
import { CreateCustomerInput, CreateCustomerOutput, CreateCustomerUseCase } from '../../interfaces/use_cases/customer_use_cases/create_customer';

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