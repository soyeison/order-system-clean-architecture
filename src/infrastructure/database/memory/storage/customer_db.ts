
import { Customer } from "../../../../entities/Customer"
import { CustomerDBInterface } from "../interfaces/customer_db.interface"

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

    async getOneCustomer(id: string): Promise<Customer | undefined> {
        try {
            return this.customers.find((customer) => customer.id === id)
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }

    async updateCustomer(id: string, updatedCustomer: Customer): Promise<Customer> {
        try {
            const index = this.customers.findIndex((customer) => customer.id === id)
            if (index !== -1) {
                this.customers[index] = updatedCustomer
                return updatedCustomer
            } else {
                throw new Error('Cliente no encontrado')
            }
        } catch (error) {
            console.log(error)
            throw new Error('')
        }
    }
}