import type {Customer} from "./Customer";

export class Storno {
    
    id: string | undefined = undefined as string | undefined;
    publicId: string | undefined = undefined as string | undefined;
    bookedAt: Date | undefined = undefined as Date | undefined;
    price: number | undefined = undefined as number | undefined;
    taxRate: number | undefined = undefined as number | undefined;
    customer: Customer | undefined = undefined as Customer | undefined;

    constructor(id?: string, publicId?: string, bookedAt?: Date, price?: number, taxRate?: number, customer?: Customer) {
        this.id = id;
        this.publicId = publicId;
        this.bookedAt = bookedAt;
        this.price = price;
        this.taxRate = taxRate;
        this.customer = customer;
    }

}