import { Customer } from "../../entities/Customer";

export interface CustomerDBInterface {
    addCustomer(customer: Customer): Promise<void>
    getCustomers(): Promise<Customer[]>
    getOneCustomer(id: string): Promise<Customer>
}

export class CustomerDB implements CustomerDBInterface {
    private customers: Customer[]

    constructor() {
        this.customers = []
    }

    async addCustomer(customer: Customer): Promise<void> {
        try {
            this.customers.push(customer)
            console.log("Se pudo agregar el customer correctamente")
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getCustomers(): Promise<Customer[]> {
        try {
            return this.customers
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async getOneCustomer(id: string): Promise<Customer> {
        try {
            const customer = this.customers.find((customer) => customer.id === id)
    
            if (!customer) {
                throw new Error('')
            }
            return customer
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }
}

export const customerDBInstance = new CustomerDB()