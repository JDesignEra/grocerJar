import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSelect, IonSelectOption } from '@ionic/angular';

@Component({
  selector: 'app-filter-grocery',
  templateUrl: './filter-grocery.page.html',
  styleUrls: ['./filter-grocery.page.scss'],
})
export class FilterGroceryPage implements OnInit {
  sortState: string[];
  filterForm: FormGroup;
  submitted: boolean = false;
  
  sortByText: string[];
  
  constructor(private modalController: ModalController) {}
  @ViewChild('sortBySelect') sortBySelect: IonSelect;

  ngOnInit() {
    this.sortByText = this.sortState && this.sortState.length > 1 && this.sortState[0] === 'status' ? ['Checked First', 'Unchecked First'] : ['Ascending', 'Descending']

    this.filterForm = new FormGroup({
      target: new FormControl(this.sortState && this.sortState.length > 1 && this.sortState[0] ? this.sortState[0] : null, [Validators.nullValidator]),
      type: new FormControl(this.sortState && this.sortState.length > 1 && this.sortState[1] ? this.sortState[1] : null, [Validators.nullValidator])
    });
  }

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
  
  targetListener(e) {
    if (e.target.value === 'status') {
      this.sortByText = ['Checked First', 'Unchecked First'];
    }
    else {
      this.sortByText = ['Ascending', 'Descending'];
    }
    
    this.sortBySelect.selectedText = '';
  }

  typeListener(e) {
    if (e.target.value === 'asc') {
      this.sortBySelect.selectedText = this.sortByText[0];
    }
    else {
      this.sortBySelect.selectedText = this.sortByText[1];
    }
  }
}
