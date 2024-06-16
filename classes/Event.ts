import {Address} from "./Address";
import {TicketType} from "./TicketType";

export class Event {

    id: string | undefined = undefined as string | undefined;
    eventName: string | undefined = undefined as string | undefined;
    startsAt: Date | undefined = undefined;
    endsAt: Date | undefined = undefined;
    address: Address = new Address("", "", "", "");
    description: string | undefined = undefined as string | undefined;
    ticketTypes: TicketType[] | undefined = undefined as TicketType[] | undefined;
    entryStarted: boolean | undefined = undefined as boolean | undefined;

}