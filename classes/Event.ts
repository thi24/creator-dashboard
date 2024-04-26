import { Address } from "./Address";
import { TicketType } from "./TicketType";

export class Event {
  
    id = undefined as string | undefined;
    eventName = "" as string;
    startsAt = new Date() as Date;
    endsAt = new Date() as Date;
    address = new Address("", "", "", "");
    description = "" as string;
    ticketTypes = undefined as TicketType[] | undefined;

}