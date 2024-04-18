import type { Customer } from "./Customer";
import type { TicketStatus } from "./TicketStatus";
import type { TicketType } from "./TicketType";

export class Ticket {

    id = undefined as string | undefined;
    status = undefined as TicketStatus | undefined;
    price = undefined as number | undefined;
    taxRate = undefined as number | undefined;
    customer = undefined as Customer | undefined;
    ticketType = undefined as TicketType | undefined;

    constructor(id?: string, status?: TicketStatus, price?: number, taxRate?: number, customer?: Customer, ticketType?: TicketType) {
        this.id = id;
        this.status = status;
        this.price = price;
        this.taxRate = taxRate;
        this.customer = customer;
        this.ticketType = ticketType;
    }

}