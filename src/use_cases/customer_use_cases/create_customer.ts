import { Customer } from "../../entities/Customer";
import { CreateCustomerInput, CreateCustomerOutput, CreateCustomerUseCase } from '../../interfaces/use_cases/customer_use_cases/create_customer';
import { UUIDGenerator } from '../../infrastructure/utils/uuid_generator';
import { CustomerRepositoryInterface } from "../../interfaces/repositories/customer_repository.interface";

export class CreateCustomerImpl implements CreateCustomerUseCase {
    constructor(
        // Debo traerme las interfaces y no las implementaciones para que sea agnostico de la implementacion como tal
        private readonly customerRepositoryRepo: CustomerRepositoryInterface
    ) {}

    async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
        if (!this.isCustomerOver18(input.contactInfo.dateOfBirth)) {
            throw new Error('El cliente debe tener al menos 18 años para registrarse');
        }
        const customer = await this.createCustomer(input)

        // Guardar este customer en memoria
        await this.customerRepositoryRepo.addCustomer(customer)

        return {
            customer
        }
    }

    private async createCustomer(input: CreateCustomerInput): Promise<Customer> {
        try {
            const id = UUIDGenerator.generateUUID()
            const newCustomer = new Customer(
                id, 
                input.name, 
                input.shippingAddress, 
                {
                    email: input.contactInfo.email, 
                    phoneNumber: input.contactInfo.phoneNumber, 
                    dateOfBirth: input.contactInfo.dateOfBirth
                }, 
                'Cash', 
                []
            )
            return newCustomer
        } catch (error) {
            console.log(error)
            throw new Error('No se pudo crear el customer')
        }
    }

    private isCustomerOver18(dateOfBirth: Date) {
        const now = new Date()
        const birthDate = new Date(dateOfBirth)
        const age = now.getFullYear() - birthDate.getFullYear()
        const monthDiff = now.getMonth() - birthDate.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            return age - 1 >= 18;
        }

        return age >= 18;
    }
}