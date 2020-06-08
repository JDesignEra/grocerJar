import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddGroceryPageRoutingModule } from './add-grocery-routing.module';

import { AddGroceryPage } from './add-grocery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddGroceryPageRoutingModule
  ],
  declarations: [AddGroceryPage]
})
export class AddGroceryPageModule {}
