import { Order, OrderStatus } from "../../../../entities/Order";
import { StateTransitionStrategy } from "../../../../interfaces/use_cases/order_use_cases/update_order_status/state_transition_strategies/state_transition_strategy";

export class ShipTransitionStrategy implements StateTransitionStrategy {
    executeTransition(order: Order): void {
        order.status = OrderStatus.Shipped
    }

    canTransition(order: Order): boolean {
        if (order.status !== OrderStatus.Confirmed) {
            return false
        }

        return true
    }
}