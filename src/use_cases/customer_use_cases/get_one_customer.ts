import { CustomerRepositoryInterface } from "../../interfaces/repositories/customer_repository.interface";
import { GetOneCustomerInput, GetOneCustomerOutput, GetOneCustomerUseCase } from "../../interfaces/use_cases/customer_use_cases/get_one_customer";

export class GetOneCustomerImpl implements GetOneCustomerUseCase {
    constructor(
        private readonly customerRepositoryRepo: CustomerRepositoryInterface
    ) {}

    async execute(input: GetOneCustomerInput): Promise<GetOneCustomerOutput> {
        const customer = await this.getOneCustomer(input.id)

        return {
            customer
        }
    }

    private async getOneCustomer(id: string) {
        const customer = await this.customerRepositoryRepo.getOneCustomer(id)

        if (!customer) {
            throw new Error('')
        }

        return customer
    }
}