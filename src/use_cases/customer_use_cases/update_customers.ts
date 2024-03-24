import { UpdateCustomerInput, UpdateCustomerOutput, UpdateCustomerUseCase } from "../../interfaces/use_cases/customer_use_cases/update_customer";
import { CustomerRepository } from "../../repositories/customer/customer_repository";

export class UpdateCustomerImpl implements UpdateCustomerUseCase {
    constructor(
        private readonly customerRepositoryRepo: CustomerRepository
    ) {}

    async execute(input: UpdateCustomerInput): Promise<UpdateCustomerOutput> {
        const customer = await this.customerRepositoryRepo.getOneCustomer(input.id)

        if (!customer) {
            throw new Error('Cliente no encontrado')
        }
        const updatedCustomer = {...customer, ...input.changes}

        await this.customerRepositoryRepo.updateCustomer(input.id, updatedCustomer)

        return {
            updatedCustomer
        }
    }
}