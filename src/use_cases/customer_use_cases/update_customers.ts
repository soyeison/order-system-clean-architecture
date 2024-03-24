import { customerRepository } from "../../repositories/customer/customer_repository";
import { UpdateCustomerInput, UpdateCustomerOutput, UpdateCustomerUseCase } from "../../interfaces/use_cases/customer_use_cases/update_customer";

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