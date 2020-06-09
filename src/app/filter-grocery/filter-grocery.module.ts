import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterGroceryPageRoutingModule } from './filter-grocery-routing.module';

import { FilterGroceryPage } from './filter-grocery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FilterGroceryPageRoutingModule
  ],
  declarations: [FilterGroceryPage]
})
export class FilterGroceryPageModule {}
