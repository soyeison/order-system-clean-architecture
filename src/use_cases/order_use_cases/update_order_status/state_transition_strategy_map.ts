import { OrderStatus } from "../../../entities/Order";
import { StateTransitionStrategy } from "../../../interfaces/use_cases/order_use_cases/update_order_status/state_transition_strategies/state_transition_strategy";
import { CancelTransitionStrategy } from "./state_transition_strategies/cancel_transition_strategy";
import { ConfirmTransitionStrategy } from "./state_transition_strategies/confirm_transition_strategy";
import { DeliverTransitionStrategy } from "./state_transition_strategies/deliver_transition_strategy";
import { ShipTransitionStrategy } from "./state_transition_strategies/ship_transition_strategy";

export const transitionStrategies = new Map<string, StateTransitionStrategy> ()
transitionStrategies.set(OrderStatus.Confirmed, new ConfirmTransitionStrategy());
transitionStrategies.set(OrderStatus.Shipped, new ShipTransitionStrategy());
transitionStrategies.set(OrderStatus.Delivered, new DeliverTransitionStrategy());
transitionStrategies.set(OrderStatus.Cancelled, new CancelTransitionStrategy());