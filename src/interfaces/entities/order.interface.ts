import { Customer } from "../../entities/Customer";
import { OrderStatus } from "../../entities/Order";
import { Product } from "../../entities/Product";

export interface OrderInterface {
    id: string;
    products: Product[];
    customer: Customer;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;
}