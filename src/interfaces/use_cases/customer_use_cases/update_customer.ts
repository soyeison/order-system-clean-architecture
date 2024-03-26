import { Customer } from "../../../entities/Customer";
import { BaseUseCase } from "../use_case.interface";

export interface UpdateCustomerInput {
    customerId: string;
    changes: Partial<Customer>
}

export interface UpdateCustomerOutput {
    updatedCustomer: Customer
}

export interface UpdateCustomerUseCase extends BaseUseCase<UpdateCustomerInput, UpdateCustomerOutput> {}