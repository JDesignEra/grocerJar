export class Grocery {
    id: string;
    item: string;
    quantity: number;
    image: string;
    status: boolean;

    constructor(item: string, quantity: number, status: boolean = false, image: string = null, id: string = '') {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
        this.image = image;
        this.status = status;

        return {
            id: this.id,
            item: this.item,
            quantity: this.quantity,
            image: this.image,
            status: this.status
        };
    }
}