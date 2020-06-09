import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Grocery } from '../shared/models/grocery';

@Component({
  selector: 'app-filter-grocery',
  templateUrl: './filter-grocery.page.html',
  styleUrls: ['./filter-grocery.page.scss'],
})
export class FilterGroceryPage implements OnInit {
  sortState: string[];
  filterForm: FormGroup;
  submitted: boolean = false;
  
  constructor(private modalController: ModalController) {
    this.filterForm = new FormGroup({
      target: new FormControl(this.sortState && this.sortState.length > 1 && this.sortState[0] ? this.sortState[0] : null, [Validators.nullValidator]),
      type: new FormControl(this.sortState && this.sortState.length > 2 && this.sortState[1] ? this.sortState[1] : null, [Validators.nullValidator])
    });
  }

  ngOnInit() {}

  sort() {
    this.submitted = true;

    if (this.filterForm.valid) {
      this.sortState = [this.filterForm.value.target, this.filterForm.value.type];
      this.modalController.dismiss(this.sortState);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
