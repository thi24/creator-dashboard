import type {TicketType} from "./TicketType";

export class BookingItem {

    id: string | undefined = undefined as string | undefined;
    quantity: number | undefined = undefined as number | undefined;
    ticketType: TicketType | undefined = undefined as TicketType | undefined;

}