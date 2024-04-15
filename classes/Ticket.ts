import type { Customer } from "./Customer";
import type { TicketStatus } from "./TicketStatus";

export class Ticket {

    id = undefined as string | undefined;
    status = undefined as TicketStatus | undefined;
    price = undefined as number | undefined;
    taxRate = undefined as number | undefined;
    customer = undefined as Customer | undefined;

    constructor(id?: string, status?: TicketStatus, price?: number, taxRate?: number, customer?: Customer) {
        this.id = id;
        this.status = status;
        this.price = price;
        this.taxRate = taxRate;
        this.customer = customer;
    }

}