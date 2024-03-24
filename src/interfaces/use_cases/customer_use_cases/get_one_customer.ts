import { Customer } from "../../../entities/Customer"
import { BaseUseCase } from "../use_case.interface"

export interface GetOneCustomerInput {
    id: string
}

export interface GetOneCustomerOutput {
    customer: Customer
}

export interface GetOneCustomerUseCase extends BaseUseCase<GetOneCustomerInput, GetOneCustomerOutput> {}