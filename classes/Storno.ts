import type { Booking } from "./Booking";
import type { Ticket } from "./Ticket";
import type { CancellationStatus } from "./CancellationStatus";

export class Storno {
    
    id: string | undefined = undefined as string | undefined;
    ticket: Ticket | undefined = undefined as Ticket | undefined;
    booking: Booking | undefined = undefined as Booking | undefined;
    requestedAt: Date | undefined = undefined as Date | undefined;
    cancelStatus: CancellationStatus | undefined = undefined as CancellationStatus | undefined;

    constructor(stornoId?: string, ticket?: Ticket, booking?: Booking, requestedAt?: Date, cancelStatus?: CancellationStatus) {
        this.id = stornoId;
        this.ticket = ticket;
        this.booking = booking;
        this.requestedAt = requestedAt;
        this.cancelStatus = cancelStatus;
    }

}