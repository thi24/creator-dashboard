import type { Booking } from "./Booking";
import type { Ticket } from "./Ticket";
import type { TicketStatus } from "./TicketStatus";

export class Storno {
    
    id: string | undefined = undefined as string | undefined;
    ticket: Ticket | undefined = undefined as Ticket | undefined;
    booking: Booking | undefined = undefined as Booking | undefined;
    requestedAt: Date | undefined = undefined as Date | undefined;
    cancelStatus: TicketStatus | undefined = undefined as TicketStatus | undefined;

    constructor(stornoId?: string, ticket?: Ticket, booking?: Booking, requestedAt?: Date, cancelStatus?: TicketStatus) {
        this.id = stornoId;
        this.ticket = ticket;
        this.booking = booking;
        this.requestedAt = requestedAt;
        this.cancelStatus = cancelStatus;
    }

}