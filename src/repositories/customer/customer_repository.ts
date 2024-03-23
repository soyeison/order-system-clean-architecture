import { Customer } from "../../entities/Customer"
import { CustomerDB, customerDBInstance } from "../../infrastructure/database/db_storage"

export interface CustomerRepositoryInterface {
    addCustomer(customer: Customer): Promise<void>
    getCustomers(): Promise<Customer[]>
    getOneCustomer(id: string): Promise<Customer>
}

export class CustomerRepository implements CustomerRepositoryInterface {
    constructor(private readonly customerRepo: CustomerDB ) {}

    async addCustomer(customer: Customer): Promise<void> {
        await this.customerRepo.addCustomer(customer)
    }

    async getCustomers(): Promise<Customer[]> {
        return await this.customerRepo.getCustomers()
    }

    async getOneCustomer(id: string): Promise<Customer> {
        return await this.customerRepo.getOneCustomer(id)
    }

}


export const customerRepository = new CustomerRepository(customerDBInstance);