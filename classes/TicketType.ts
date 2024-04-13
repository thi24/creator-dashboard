export class TicketType {
  
    id = "" as string;
    name = "" as string;
    price = undefined as number | undefined;
    validFrom = new Date() as Date;
    validTo = new Date() as Date;
    capacity = undefined as number | undefined;
    active = undefined as boolean | undefined;
    taxRate = undefined as number | undefined;
    eventid = "" as string;
}