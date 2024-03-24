import { customerRepository } from "../../repositories/customer/customer_repository";
import { GetOneCustomerInput, GetOneCustomerOutput, GetOneCustomerUseCase } from "../../interfaces/use_cases/customer_use_cases/get_one_customer";

export class GetOneCustomerImpl implements GetOneCustomerUseCase {
    async execute(input: GetOneCustomerInput): Promise<GetOneCustomerOutput> {
        const customer = await this.getOneCustomer(input.id)

        return {
            customer
        }
    }

    async getOneCustomer(id: string) {
        const customer = await customerRepository.getOneCustomer(id)

        if (!customer) {
            throw new Error('')
        }

        return customer
    }
}