import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../shared/services/grocery.service';
import { Grocery } from '../shared/models/grocery';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-edit-grocery',
  templateUrl: './edit-grocery.page.html',
  styleUrls: ['./edit-grocery.page.scss'],
})
export class EditGroceryPage implements OnInit {
  gid: number;
  grocery: Grocery;

  editGroceryForm: FormGroup;
  submitted: boolean = false;

  static quantityValidator(fc: FormControl) {
    if (fc.value <= 0) {
      return ({postiveNumber: true});
    }
    else {
      return (null);
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private groceryService: GroceryService, private toastService: ToastService) {
    this.gid = this.route.snapshot.params.id;
    this.grocery = this.groceryService.getGroceryById(this.gid);

    this.editGroceryForm = new FormGroup({
      gid: new FormControl({value: this.gid, disabled: true}),
      item: new FormControl(this.grocery.item, [Validators.required]),
      quantity: new FormControl(this.grocery.quantity, [EditGroceryPage.quantityValidator]),
      status: new FormControl(this.grocery.status)
    });
  }

  ngOnInit() {}

  update() {
    this.submitted = true;

    if (this.editGroceryForm.valid) {
      this.grocery.item = this.editGroceryForm.value.item;
      this.grocery.quantity = this.editGroceryForm.value.quantity;
      this.grocery.status = this.editGroceryForm.value.status;

      this.groceryService.update(this.grocery);

      this.toastService.presentToast(`Updated grocery item id ${this.grocery.id}.`, 2500, 'success');

      this.router.navigate(['tabs/groceries'])
    }
  }
}
