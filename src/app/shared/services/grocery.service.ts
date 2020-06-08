import { Injectable } from '@angular/core';
import { Grocery } from '../models/grocery';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  groceries: Grocery[] = []

  constructor() {
    this.groceries = [
      new Grocery('Bread', 2, 0, false),
      new Grocery('Egg', 1, 1, true),
      new Grocery('Milk', 3, 2, false),
    ]
  }

  getGroceries(): Grocery[] {
    return this.groceries;
  }

  getGroceryById(id: number): Grocery {
    return this.groceries.find(i => i.id == id);
  }

  add(grocery: Grocery) {
    // Simiulate Database/SQL auto-incremental
    grocery.id = this.groceries.length > 0 ? this.groceries[this.groceries.length - 1].id + 1 : 0
    this.groceries.push(grocery);
  }

  delete(grocery: Grocery) {
    const idx = this.groceries.findIndex(i => i.id == grocery.id);

    if (idx >= 0) {
      this.groceries.splice(idx, 1);
    }
  }

  update(grocery: Grocery) {
    const idx = this.groceries.findIndex(i => i.id == grocery.id);

    if (idx >= 0) {
      const g = this.groceries[idx];

      g.item = grocery.item;
      g.quantity = grocery.quantity;
      g.image = grocery.image;
      g.status = grocery.status;
    }
  }
}
