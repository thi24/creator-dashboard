export class Address {
    id: string | undefined;
    street: string;
    city: string;
    state: string;
    zip: string;

    constructor(street: string, city: string, state: string, zip: string, id?: string) {
        this.id = id || undefined;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }
}