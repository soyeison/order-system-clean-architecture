import { GetAllCustomersOutput, GetAllCustomersUseCase } from "../../interfaces/use_cases/customer_use_cases/get_all_customers";
import { CustomerRepository } from "../../repositories/customer/customer_repository";

export class GetAllCustomersImpl implements GetAllCustomersUseCase {
    constructor(
        private readonly customerRepositoryRepo: CustomerRepository
    ) {}
    async execute(input: void): Promise<GetAllCustomersOutput> {
        const customers = await this.customerRepositoryRepo.getCustomers()

        return {
            customers
        }
    }
}