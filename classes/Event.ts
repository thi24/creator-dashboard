import { Address } from "./Address";
import { TicketType } from "./TicketType";

export class Event {
  
    id = "" as string;
    eventName = "" as string;
    startsAt = new Date() as Date;
    endsAt = new Date() as Date;
    address = new Address("", "", "", "");
    description = "" as string;
    ticketTypes = undefined as TicketType[] | undefined;

}