import { Order } from "../../../../../entities/Order";

export interface StateTransitionStrategy {
    executeTransition(order: Order): void;
    canTransition(order: Order): boolean;
}