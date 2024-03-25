import { Customer } from "../../entities/Customer"

export interface CustomerRepositoryInterface {
    addCustomer(customer: Customer): Promise<void>
    getCustomers(): Promise<Customer[]>
    getOneCustomer(id: string): Promise<Customer | undefined>
    updateCustomer(id: string, customer: Customer): Promise<Customer>
}