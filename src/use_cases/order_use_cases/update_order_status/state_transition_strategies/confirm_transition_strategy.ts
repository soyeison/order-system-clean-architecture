import { Order, OrderStatus } from "../../../../entities/Order";
import { StateTransitionStrategy } from "../../../../interfaces/use_cases/order_use_cases/update_order_status/state_transition_strategies/state_transition_strategy";

export class ConfirmTransitionStrategy implements StateTransitionStrategy {
    
    executeTransition(order: Order): void {
        order.status = OrderStatus.Confirmed
    }

    canTransition(order: Order): boolean {
        if (order.status !== OrderStatus.Pending) {
            return false
        }

        return true
    }
}