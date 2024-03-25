import { Customer } from "../../../entities/Customer"
import { CustomerRepositoryInterface } from "../../../interfaces/repositories/customer_repository.interface"
import { CustomerDB } from "../../database/storage/customer_db"

export class CustomerRepository implements CustomerRepositoryInterface {
    constructor(private readonly customerRepo: CustomerDB ) {}

    async addCustomer(customer: Customer): Promise<void> {
        await this.customerRepo.addCustomer(customer)
    }

    async getCustomers(): Promise<Customer[]> {
        return await this.customerRepo.getCustomers()
    }

    async getOneCustomer(id: string): Promise<Customer | undefined> {
        return await this.customerRepo.getOneCustomer(id)
    }

    async updateCustomer(id: string, customer: Customer) {
        return await this.customerRepo.updateCustomer(id, customer)
    }
}