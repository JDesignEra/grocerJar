import { map } from 'rxjs/operators';
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
    this.groceryService.getAll().subscribe(i => {
      this.groceries = i;
      this.initCheckBoxVerify();
    });
  }

  ngOnInit() {}

  delete(grocery: Grocery) {
    this.groceryService.delete(grocery.id);
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
      if (obj.status) {
        checked++;
      }

      this.groceryService.update(obj);
    });

    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.indeterminateState = true;
      this.checkParent  = false;
    }
    else if (checked == totalItems) {
      // If all are checked
      this.checkParent  = true;
      this.indeterminateState = false;
    }
    else {
      // If none is checked
      this.indeterminateState = false;
      this.checkParent  = false;
    }
  }

  initCheckBoxVerify() {
    const totalItems = this.groceries.length;
    let checked = 0;

    this.groceries.forEach(obj => {
      if (obj.status) {
        checked++;
      }
    });

    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.indeterminateState = true;
      this.checkParent  = false;
    }
    else if (checked == totalItems) {
      // If all are checked
      this.checkParent  = true;
      this.indeterminateState = false;
    }
    else {
      // If none is checked
      this.indeterminateState = false;
      this.checkParent  = false;
    }
  }

  search(e) {
    const text = e.target.value;
    const allGrocery = this.groceryService.getAll();

    if (!text || text.trim() === '') {
      allGrocery.subscribe(i => {
        this.groceries = i;

        this.initCheckBoxVerify();
      });
    }
    else {
      if (text.toLowerCase() === 'true' || text.toLowerCase() === 'false') {
        allGrocery.subscribe(i => {
          this.groceries = i.filter(obj => obj.status.toString() === text.toLowerCase())

          this.initCheckBoxVerify();
        })
      }
      else {
        allGrocery.subscribe(i => {
          this.groceries = i.filter(obj => obj.item.toLowerCase().includes(text.toLowerCase()) || obj.quantity.toString() === text);
          this.initCheckBoxVerify();

          this.initCheckBoxVerify();
        });
      }
    }
  }

  refresh(e) {
    this.searchBar.value = null;
    this.initCheckBoxVerify();

    e.target.complete();
  }

  updatedToastMsg() {
    this.toastService.presentToast('Updated grocery list.', 2000, 'success');
  }
}
