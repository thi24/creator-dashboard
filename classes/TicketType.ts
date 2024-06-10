import {Event} from '@/classes/Event';

export class TicketType {

    id: string | undefined = undefined;
    name: string = "";
    price: number | undefined = undefined;
    validFrom: Date = new Date();
    validTo: Date = new Date();
    capacity: number | undefined = undefined;
    active: boolean = true;
    taxRate: number | undefined = undefined;
    entryStarted: boolean | undefined = undefined;
    event: Event | undefined = undefined;
}