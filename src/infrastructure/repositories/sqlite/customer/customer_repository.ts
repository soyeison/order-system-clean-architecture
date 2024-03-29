import { Model, Sequelize } from "sequelize";
import { Customer } from "../../../../entities/Customer";
import { CustomerRepositoryInterface } from "../../../../interfaces/repositories/customer_repository.interface";
import CustomerDB from "../../../database/sequelize/models/Customer";

export class CustomerRepository implements CustomerRepositoryInterface {
    constructor(
        private readonly sequelizeRepo: Sequelize
    ) {}

    async addCustomer(customer: Customer): Promise<void> {
        const adapter = {
            id: customer.id,
            name: customer.name,
            shippingAddress: customer.shippingAddress,
            email: customer.contactInfo.email,
            phoneNumber: customer.contactInfo.phoneNumber,
            dateOfBirth: customer.contactInfo.dateOfBirth,
            defaultPaymentMethod: customer.defaultPaymentMethod,
        }
        await this.sequelizeRepo.models.CustomerDB.create(adapter)
    }

    async getCustomers(): Promise<Customer[]> {
        const customerDB = await this.sequelizeRepo.models.CustomerDB.findAll()
        return customerDB.map((element) => {
            const elementJSON = element.toJSON()
            return new Customer(
                elementJSON.id, 
                elementJSON.name, 
                elementJSON.shippingAddress, 
                {
                    email: elementJSON.email,
                    dateOfBirth: elementJSON.dateOfBirth,
                    phoneNumber: elementJSON.phoneNumber,
                },
                elementJSON.defaultPaymentMethod,
                []
            )
        })
    }

    async getOneCustomer(id: string): Promise<Customer | undefined> {
        const customerDB = await this.sequelizeRepo.models.CustomerDB.findByPk(id)

        if (!customerDB) {
            throw new Error('No existe el customer')
        }

        const customerJSON = customerDB.toJSON()

        return new Customer(
            customerJSON.id, 
            customerJSON.name, 
            customerJSON.shippingAddress, 
            {
                email: customerJSON.email,
                dateOfBirth: customerJSON.dateOfBirth,
                phoneNumber: customerJSON.phoneNumber,
            },
            customerJSON.defaultPaymentMethod,
            []
        )
    }

    updateCustomer(id: string, customer: Customer): Promise<Customer> {
        throw new Error("Method not implemented.");
    }
}