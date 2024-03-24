import { customerRepository } from "../../repositories/customer/customer_repository";
import { GetAllCustomersOutput, GetAllCustomersUseCase } from "../../interfaces/use_cases/customer_use_cases/get_all_customers";

export class GetAllCustomersImpl implements GetAllCustomersUseCase {
    async execute(input: void): Promise<GetAllCustomersOutput> {
        const customers = await customerRepository.getCustomers()

        return {
            customers
        }
    }
}