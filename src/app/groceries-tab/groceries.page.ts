import { map } from 'rxjs/operators';
import { GroceryService } from '../shared/services/grocery.service';
import { Component, ViewChild } from '@angular/core';
import { Grocery } from '../shared/models/grocery';
import { ToastService } from '../shared/services/toast.service';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { FilterGroceryPage } from '../filter-grocery/filter-grocery.page';

@Component({
  selector: 'app-groceries',
  templateUrl: 'groceries.page.html',
  styleUrls: ['groceries.page.scss']
})
export class GroceriesPage {
  @ViewChild('searchBar', {static: false}) searchBar: IonSearchbar;

  grocery: any;
  groceries: Grocery[] = [];
  indeterminateState: boolean;
  checkParent: boolean;
  searchText: string;
  sortState: string[];

  constructor(private groceryService: GroceryService, private toastService: ToastService, private modalController: ModalController) {
    this.groceryService.getAll().subscribe(i => {
      this.groceries = i;
      this.initCheckBoxVerify();
    });
  }

  ngOnInit() {}

  delete(grocery: Grocery) {
    this.groceryService.delete(grocery.id);
    this.groceryService.deleteImage(grocery.image);
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

  refresh(e) {
    this.searchBar.value = null;
    this.searchText = null;
    this.initCheckBoxVerify();

    e.target.complete();
  }

  search(e) {
    this.searchText = e.target.value;
    const allGrocery = this.groceryService.getAll();

    if (!this.searchText || this.searchText.trim() === '') {
      allGrocery.subscribe(i => {
        this.groceries = i;

        this.initCheckBoxVerify();
      });
    }
    else {
      if (this.searchText.toLowerCase() === 'true' || this.searchText.toLowerCase() === 'false') {
        allGrocery.subscribe(i => {
          this.groceries = i.filter(obj => obj.status.toString() === this.searchText.toLowerCase());

          this.initCheckBoxVerify();
        })
      }
      else {
        allGrocery.subscribe(i => {
          this.groceries = i.filter(obj => obj.item.toLowerCase().includes(this.searchText.toLowerCase()) || obj.quantity.toString() === this.searchText);

          this.initCheckBoxVerify();
        });
      }
    }
  }

  updatedToastMsg() {
    this.toastService.presentToast('Updated grocery list.', 2000, 'success');
  }

  async filter() {
    const modal = await this.modalController.create({
      component: FilterGroceryPage,
      componentProps: {
        sortState: this.sortState
      }
    });

    modal.onDidDismiss().then(data => {
      const allGrocery = this.groceryService.getAll();
      this.sortState = data['data'] && data['data'].length == 2 ? [data['data'][0], data['data'][1]] : [];
      
      if (this.sortState && this.sortState.length > 1) {
        if (this.sortState[0] === 'item') {
          if (this.sortState[1] === 'asc') {
            if (!this.searchText || this.searchText.trim() === '') {
              allGrocery.subscribe(i => {
                this.groceries = i.sort(function(a, b) {
                  if (a.item < b.item) return -1;

                      if (a.item > b.item) return 1;

                      return 0;
                });
        
                this.initCheckBoxVerify();
              });
            }
            else {
              if (this.searchText.toLowerCase() === 'true' || this.searchText.toLowerCase() === 'false') {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.status.toString() === this.searchText.toLowerCase())
                    .sort(function(a, b) {
                      if (a.item < b.item) return -1;

                      if (a.item > b.item) return 1;

                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                });
              }
              else {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.item.toLowerCase().includes(this.searchText.toLowerCase()) || obj.quantity.toString() === this.searchText)
                    .sort(function(a, b) {
                      if (a.item < b.item) return -1;

                      if (a.item > b.item) return 1;

                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                });
              }
            }
          }
          else {
            if (!this.searchText || this.searchText.trim() === '') {
              allGrocery.subscribe(i => {
                this.groceries = i.sort(function(a, b) {
                  if (a.item > b.item) return -1;

                  if (a.item < b.item) return 1;

                  return 0;
                });
        
                this.initCheckBoxVerify();
              });
            }
            else {
              if (this.searchText.toLowerCase() === 'true' || this.searchText.toLowerCase() === 'false') {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.status.toString() === this.searchText.toLowerCase())
                    .sort(function(a, b) {
                      if (a.item > b.item) return -1;
    
                      if (a.item < b.item) return 1;
    
                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                })
              }
              else {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.item.toLowerCase().includes(this.searchText.toLowerCase()) || obj.quantity.toString() === this.searchText)
                    .sort(function(a, b) {
                      if (a.item > b.item) return -1;
    
                      if (a.item < b.item) return 1;
    
                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                });
              }
            }
          }
        }
        else if (this.sortState[0] === 'quantity') {
          if (this.sortState[1] === 'asc') {
            if (!this.searchText || this.searchText.trim() === '') {
              allGrocery.subscribe(i => {
                this.groceries = i.sort(function(a, b) {
                  if (a.quantity < b.quantity) return -1;

                      if (a.quantity > b.quantity) return 1;

                      return 0;
                });
        
                this.initCheckBoxVerify();
              });
            }
            else {
              if (this.searchText.toLowerCase() === 'true' || this.searchText.toLowerCase() === 'false') {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.status.toString() === this.searchText.toLowerCase())
                    .sort(function(a, b) {
                      if (a.quantity < b.quantity) return -1;

                      if (a.quantity > b.quantity) return 1;

                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                });
              }
              else {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.item.toLowerCase().includes(this.searchText.toLowerCase()) || obj.quantity.toString() === this.searchText)
                    .sort(function(a, b) {
                      if (a.quantity < b.quantity) return -1;

                      if (a.quantity > b.quantity) return 1;

                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                });
              }
            }
          }
          else {
            if (!this.searchText || this.searchText.trim() === '') {
              allGrocery.subscribe(i => {
                this.groceries = i.sort(function(a, b) {
                  if (a.quantity > b.quantity) return -1;

                  if (a.quantity < b.quantity) return 1;

                  return 0;
                });
        
                this.initCheckBoxVerify();
              });
            }
            else {
              if (this.searchText.toLowerCase() === 'true' || this.searchText.toLowerCase() === 'false') {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.status.toString() === this.searchText.toLowerCase())
                    .sort(function(a, b) {
                      if (a.quantity > b.quantity) return -1;
    
                      if (a.quantity < b.quantity) return 1;
    
                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                })
              }
              else {
                allGrocery.subscribe(i => {
                  this.groceries = i.filter(obj => obj.item.toLowerCase().includes(this.searchText.toLowerCase()) || obj.quantity.toString() === this.searchText)
                    .sort(function(a, b) {
                      if (a.quantity > b.quantity) return -1;
    
                      if (a.quantity < b.quantity) return 1;
    
                      return 0;
                    });
        
                  this.initCheckBoxVerify();
                });
              }
            }
          }
        }
        else {
          if (!this.searchText || this.searchText.trim() === '') {
            allGrocery.subscribe(i => {
              this.groceries = i;
      
              this.initCheckBoxVerify();
            });
          }
          else {
            if (this.searchText.toLowerCase() === 'true' || this.searchText.toLowerCase() === 'false') {
              allGrocery.subscribe(i => {
                this.groceries = i.filter(obj => obj.status.toString() === this.searchText.toLowerCase());
      
                this.initCheckBoxVerify();
              })
            }
            else {
              allGrocery.subscribe(i => {
                this.groceries = i.filter(obj => obj.item.toLowerCase().includes(this.searchText.toLowerCase()) || obj.quantity.toString() === this.searchText);
      
                this.initCheckBoxVerify();
              });
            }
          }
        }
      }
    });

    return await modal.present();
  }
}
