import { TicketStatus } from "./TicketStatus";

export class BookingSearch {

    term: string = "" as string;
    dateFrom: Date | undefined = undefined as Date | undefined;
    dateTo: Date | undefined = undefined as Date | undefined;
    priceFrom: number | undefined = undefined as number | undefined;
    priceTo: number | undefined = undefined as number | undefined;

    status: TicketStatus[] = [TicketStatus.VALID, TicketStatus.REDEEMED, TicketStatus.CANCELLED]

}