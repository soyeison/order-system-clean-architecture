import { GetOneCustomerInput, GetOneCustomerOutput, GetOneCustomerUseCase } from "../../interfaces/use_cases/customer_use_cases/get_one_customer";
import { CustomerRepository } from "../../repositories/customer/customer_repository";

export class GetOneCustomerImpl implements GetOneCustomerUseCase {
    constructor(
        private readonly customerRepositoryRepo: CustomerRepository
    ) {}

    async execute(input: GetOneCustomerInput): Promise<GetOneCustomerOutput> {
        const customer = await this.getOneCustomer(input.id)

        return {
            customer
        }
    }

    async getOneCustomer(id: string) {
        const customer = await this.customerRepositoryRepo.getOneCustomer(id)

        if (!customer) {
            throw new Error('')
        }

        return customer
    }
}