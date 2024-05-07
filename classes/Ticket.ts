import type { BookingItem } from "./BookingItem";
import type { Customer } from "./Customer";
import type { TicketStatus } from "./TicketStatus";
import type { TicketType } from "./TicketType";

export class Ticket {

    id = undefined as string | undefined;
    publicId = undefined as string | undefined;
    status = undefined as TicketStatus | undefined;
    bookedAt = undefined as Date | undefined;
    price = undefined as number | undefined;
    taxRate = undefined as number | undefined;
    customer = undefined as Customer | undefined;
    bookingItem = undefined as BookingItem | undefined;

    constructor(id?: string, publicId?: string, status?: TicketStatus, bookedAt?: Date, price?: number, taxRate?: number, customer?: Customer, bookingItem?: BookingItem) {
        this.id = id;
        this.publicId = publicId;
        this.status = status;
        this.bookedAt = bookedAt;
        this.price = price;
        this.taxRate = taxRate;
        this.customer = customer;
        this.bookingItem = bookingItem;
    }

}