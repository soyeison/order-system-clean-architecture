import { Customer } from "../../../entities/Customer"

export interface CustomerDBInterface {
    addCustomer(customer: Customer): Promise<void>
    getCustomers(): Promise<Customer[]>
    getOneCustomer(id: string): Promise<Customer | undefined>
    updateCustomer(id: string, updatedCustomer: Customer): Promise<Customer>
}