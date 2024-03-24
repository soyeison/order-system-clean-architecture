import { Customer } from "../../entities/Customer";
import { BaseUseCase } from "../../interfaces/use_cases/use_case.interface";
import { customerRepository } from "../../repositories/customer/customer_repository";
import { CreateCustomerImpl, CreateCustomerInput } from "./create_customer";
import { GetAllCustomersImpl } from "./get_all_customers";


export interface UpdateCustomerInput {
    id: string;
    changes: Partial<Customer>
}

export interface UpdateCustomerOutput {
    updatedCustomer: Customer
}

export interface UpdateCustomerUseCase extends BaseUseCase<UpdateCustomerInput, UpdateCustomerOutput> {}

export class UpdateCustomerImpl implements UpdateCustomerUseCase {
    async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput> {
        const customer = await customerRepository.getOneCustomer(input.id)

        if (!customer) {
            throw new Error('Cliente no encontrado')
        }

        const updatedCustomer = {...customer, ...input.changes}

        // Usar el repositorio para actualizar el usuario
        customerRepository.updateCustomer(input.id, updatedCustomer)

        return {
            updatedCustomer
        }
    }
}

// TODO: Revisar que informacion si se puede actualizar y cual no para el correcto funcionamiento de la clase
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

    const customers = new GetAllCustomersImpl()

    const allCostumers = await customers.execute()

    console.log("All customers: ", allCostumers)

    // Ahora vamos a actualizar
    const updateIntsnace = new UpdateCustomerImpl()

    updateIntsnace.execute({
        id: allCostumers.customers[0].id,
        changes: {
            name: 'Yeison Villegas'
        }
    })

    console.log("All customers: ", await customers.execute())
})() */