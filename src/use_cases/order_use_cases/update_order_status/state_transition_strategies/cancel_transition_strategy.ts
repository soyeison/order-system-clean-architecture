import { Order } from "../../../../entities/Order";
import { StateTransitionStrategy } from "../../../../interfaces/use_cases/order_use_cases/update_order_status/state_transition_strategies/state_transition_strategy";

export class CancelTransitionStrategy implements StateTransitionStrategy {
    executeTransition(order: Order): void {
        throw new Error("Method not implemented.");
    }
    canTransition(order: Order): boolean {
        throw new Error("Method not implemented.");
    }
}