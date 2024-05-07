import { Event } from '@/classes/Event';
export class TicketType {
  
    id = undefined as string | undefined;
    name = "" as string;
    price = undefined as number | undefined;
    validFrom = new Date() as Date;
    validTo = new Date() as Date;
    capacity = undefined as number | undefined;
    active = undefined as boolean | undefined;
    taxRate = undefined as number | undefined;
    event = undefined as Event | undefined;
}