import { Product } from "./Product";
import { Customer } from "./Customer";
import { OrderInterface } from "../interfaces/entities/order.interface";

export enum OrderStatus {
    Pending = "Pendiente",
    Confirmed = "Confirmada",
    Shipped = "Enviada",
    Delivered = "Entregada",
    Cancelled = "Cancelada"
}

export class Order implements OrderInterface {
    id: string;
    products: Product[];
    customer: Customer;
    totalPrice: number;
    status: OrderStatus;
    createdAt: Date;

    constructor(id: string, products: Product[], customer: Customer, totalPrice: number, status: OrderStatus, createdAt: Date) {
        this.id = id;
        this.products = products;
        this.customer = customer;
        this.totalPrice = totalPrice;
        this.status = status;
        this.createdAt = createdAt;
    }
}