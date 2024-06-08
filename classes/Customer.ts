export class Customer {

    email: string | undefined = undefined as string | undefined;
    name: string | undefined = undefined as string | undefined;
    stripeId: string | undefined = undefined as string | undefined;

    constructor(email?: string, name?: string, stripeId?: string) {
        this.email = email;
        this.name = name;
        this.stripeId = stripeId;
    }

}