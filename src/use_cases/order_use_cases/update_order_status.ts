import { OrderRepositoryInterface } from "../../interfaces/repositories/order_repository.interface";
import { UpdateCustomerInput, UpdateCustomerOutput } from "../../interfaces/use_cases/customer_use_cases/update_customer";
import { UpdateOrderStatusInput, UpdateOrderStatusOutput, UpdateOrderStatusUseCase } from "../../interfaces/use_cases/order_use_cases/update_order_status";
import { StateTransitionStrategy } from "../../interfaces/use_cases/order_use_cases/update_order_status/state_transition_strategies/state_transition_strategy";

export class UpdateOrderStatusImpl implements UpdateOrderStatusUseCase {
    constructor(
        private readonly orderRepositoryRepo: OrderRepositoryInterface,
        private readonly transitionStrategies: Map<string, StateTransitionStrategy>
    ) {}

    async execute(input: UpdateOrderStatusInput): Promise<UpdateOrderStatusOutput> {
        const order = await this.orderRepositoryRepo.getOneOrder(input.orderId)
        if (!order) {
            throw new Error('Order not found');
        }

        const strategy = this.transitionStrategies.get(input.newStatus)
        if (!strategy) {
            throw new Error('Invalid transaction')
        }

        if (!strategy.canTransition(order)) {
            throw new Error('Invalid transaction')
        }

        strategy.executeTransition(order)
        await this.orderRepositoryRepo.updateOrder(input.orderId, order)

        return {
            order
        }
    }
}