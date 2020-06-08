export class Grocery {
    id: number;
    item: string;
    quantity: number;
    image: string;
    status: boolean;

    constructor(item: string, quantity: number, id?: number, status: boolean = false, image?: string) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.image = image;
        this.status = status;
    }
}