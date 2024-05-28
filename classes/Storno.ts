import type { Customer } from "./Customer";

export class Storno {

    //To be defined
    id = undefined as string | undefined;
    publicId = undefined as string | undefined;
    bookedAt = undefined as Date | undefined;
    price = undefined as number | undefined;
    taxRate = undefined as number | undefined;
    customer = undefined as Customer | undefined;

    //To be defined
    constructor(id?: string, publicId?: string, bookedAt?: Date, price?: number, taxRate?: number, customer?: Customer) {
        this.id = id;
        this.publicId = publicId;
        this.bookedAt = bookedAt;
        this.price = price;
        this.taxRate = taxRate;
        this.customer = customer;
    }

}