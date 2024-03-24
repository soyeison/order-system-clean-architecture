import { Customer } from "../../../entities/Customer";
import { BaseUseCase } from "../use_case.interface";

export interface CreateCustomerInput {
    name: string;
    shippingAddress: string;
    contactInfo: {
        email: string;
        phoneNumber: string;
    };
}

export interface CreateCustomerOutput {
    customer: Customer
}

export interface CreateCustomerUseCase extends BaseUseCase<CreateCustomerInput, CreateCustomerOutput> {}