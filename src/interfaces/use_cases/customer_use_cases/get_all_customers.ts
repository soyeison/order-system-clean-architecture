import { Customer } from "../../../entities/Customer";
import { BaseUseCase } from "../use_case.interface";

export interface GetAllCustomersOutput {
    customers: Customer[]
}

export interface GetAllCustomersUseCase extends BaseUseCase<void, GetAllCustomersOutput> {} 