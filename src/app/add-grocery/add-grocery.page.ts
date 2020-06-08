import { ToastService } from './../shared/services/toast.service';
import { GroceryService } from './../shared/services/grocery.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Grocery } from '../shared/models/grocery';

@Component({
  selector: 'app-add-grocery',
  templateUrl: './add-grocery.page.html',
  styleUrls: ['./add-grocery.page.scss'],
})
export class AddGroceryPage implements OnInit {
  addGroceryForm: FormGroup;
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
    this.addGroceryForm = new FormGroup({
      item: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [AddGroceryPage.quantityValidator])
    });
  }

  add() {
    this.submitted = true;

    if (this.addGroceryForm.valid) {
      const grocery = new Grocery(
        this.addGroceryForm.value.item,
        this.addGroceryForm.value.quantity
      );

      this.groceryService.add(grocery);
      
      this.toastService.presentToast(`Added <b>${grocery.item}</b> to grocery list.`, 2500, 'success');

      this.router.navigate(['tabs/groceries']);
    }
  }

  ngOnInit() {}
}
