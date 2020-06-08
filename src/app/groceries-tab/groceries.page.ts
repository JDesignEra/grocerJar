import { GroceryService } from '../shared/services/grocery.service';
import { Component } from '@angular/core';
import { Grocery } from '../shared/models/grocery';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-groceries',
  templateUrl: 'groceries.page.html',
  styleUrls: ['groceries.page.scss']
})
export class GroceriesPage {
  groceries: Grocery[] = [];
  indeterminateState: boolean;
  checkParent: boolean;

  constructor(private groceryService: GroceryService, private toastService: ToastService) {
    this.groceries = this.groceryService.getGroceries();
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

  ngAfterViewInit() {
    this.verifyCheckBox();
  }

  updatedToastMsg() {
    this.toastService.presentToast('Updated grocery list.', 2000, 'success');
  }
}
