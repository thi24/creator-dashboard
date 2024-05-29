import {Address} from "./Address";
import {TicketType} from "./TicketType";

export class Event {

    id: string | undefined = undefined as string | undefined;
    eventName: string | undefined = "" as string;
    startsAt: Date = new Date() as Date;
    endsAt: Date = new Date() as Date;
    address: Address = new Address("", "", "", "");
    description: string = "" as string;
    ticketTypes: TicketType[] | undefined = undefined as TicketType[] | undefined;

}