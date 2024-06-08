import {Address} from "./Address";
import {TicketType} from "./TicketType";

export class Event {

    id: string | undefined = undefined as string | undefined;
    eventName: string | undefined = undefined as string | undefined;
    startsAt: Date = new Date() as Date;
    endsAt: Date = new Date() as Date;
    address: Address = new Address("", "", "", "");
    description: string | undefined = undefined as string | undefined;
    ticketTypes: TicketType[] | undefined = undefined as TicketType[] | undefined;

}