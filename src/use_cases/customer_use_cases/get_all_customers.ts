import { CustomerRepositoryInterface } from "../../interfaces/repositories/customer_repository.interface";
import { GetAllCustomersOutput, GetAllCustomersUseCase } from "../../interfaces/use_cases/customer_use_cases/get_all_customers";

export class GetAllCustomersImpl implements GetAllCustomersUseCase {
    constructor(
        private readonly customerRepositoryRepo: CustomerRepositoryInterface
    ) {}
    async execute(input: void): Promise<GetAllCustomersOutput> {
        const customers = await this.customerRepositoryRepo.getCustomers()

        return {
            customers
        }
    }
}