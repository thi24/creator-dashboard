import type { BookingItem } from "./BookingItem";
import type { Customer } from "./Customer";

export class Booking {

    id?: string;
    totalPrice?: number;
    bookedAt?: Date;
    customer?: Customer;
    bookingItems?: BookingItem[];

}