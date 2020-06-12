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
  imageFile: File;
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
      image: new FormControl(''),
      item: new FormControl('', [Validators.required]),
      quantity: new FormControl(1, [AddGroceryPage.quantityValidator])
    });
  }

  ngOnInit() {}

  add() {
    this.submitted = true;

    if (this.addGroceryForm.valid) {
      const uploadedFileName = this.groceryService.uploadImage(this.imageFile);

      const grocery = new Grocery(
        this.addGroceryForm.value.item,
        this.addGroceryForm.value.quantity,
        false,
        uploadedFileName
      );

      this.groceryService.add(grocery);
      
      this.toastService.presentToast('Please wait while we redirect you...', 2000, 'warning');

      setTimeout(() => {
        this.toastService.presentToast(`Added <b>${grocery.item}</b> to grocery list.`, 2500, 'success');
        this.router.navigate(['tabs/groceries']);
      }, 2000);
    }
  }

  fileListener(e: FileList) {
    this.imageFile = e.item(0);
  }
}
