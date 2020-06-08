import { GroceryService } from '../shared/services/grocery.service';
import { Component, ViewChild } from '@angular/core';
import { Grocery } from '../shared/models/grocery';
import { ToastService } from '../shared/services/toast.service';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-groceries',
  templateUrl: 'groceries.page.html',
  styleUrls: ['groceries.page.scss']
})
export class GroceriesPage {
  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;

  groceries: Grocery[] = [];
  indeterminateState: boolean;
  checkParent: boolean;

  constructor(private groceryService: GroceryService, private toastService: ToastService) {
    this.groceries = this.groceryService.getGroceries();
  }

  ngAfterViewInit() {
    this.verifyCheckBox();
  }

  delete(grocery: Grocery) {
    this.groceryService.delete(grocery);
    this.toastService.presentToast(`<b>${grocery.item}</b> item deleted.`, 2000, 'danger');
  }

  checkAll() {
    setTimeout(() => {
      this.groceries.forEach(obj => {
        obj.status = this.checkParent;
      });
    });

    this.updatedToastMsg();
  }

  verifyCheckBox() {
    const totalItems = this.groceries.length;
    let checked = 0;

    this.groceries.map(obj => {
      if (obj.status) checked++;
    });

    if (checked > 0 && checked < totalItems) {
      //If even one item is checked but not all
      this.indeterminateState = true;
      this.checkParent  = false;
    }
    else if (checked == totalItems) {
      //If all are checked
      this.checkParent  = true;
      this.indeterminateState = false;
    }
    else {
      //If none is checked
      this.indeterminateState = false;
      this.checkParent  = false;
    }
  }

  search(e) {
    const text =e.target.value;
    const allGrocery = this.groceryService.getGroceries();

    if (!text || text.trim() === '') {
      this.groceries = allGrocery;
    }
    else {
      if (text.toLowerCase() === 'true' || text.toLowerCase() === 'false') {
        this.groceries = allGrocery.filter(i => i.status.toString() === text.toLowerCase());
      }
      else {
        this.groceries = allGrocery.filter(i => i.item.toLowerCase().includes(text.toLowerCase()) || i.quantity.toString() === text);
      }
    }

    this.verifyCheckBox();
  }

  refresh(e) {
    this.searchBar.value = null;
    this.verifyCheckBox();

    e.target.complete();
  }

  updatedToastMsg() {
    this.toastService.presentToast('Updated grocery list.', 2000, 'success');
  }
}
