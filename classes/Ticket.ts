import type {BookingItem} from "./BookingItem";
import type {Customer} from "./Customer";
import type {TicketStatus} from "./TicketStatus";

export class Ticket {

    id: string | undefined = undefined as string | undefined;
    publicId: string | undefined = undefined as string | undefined;
    status: TicketStatus | undefined = undefined as TicketStatus | undefined;
    bookedAt: Date | undefined = undefined as Date | undefined;
    price: number | undefined = undefined as number | undefined;
    taxRate: number | undefined = undefined as number | undefined;
    customer: Customer | undefined = undefined as Customer | undefined;
    bookingItem: BookingItem | undefined = undefined as BookingItem | undefined;

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