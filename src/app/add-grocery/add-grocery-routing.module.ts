import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGroceryPage } from './add-grocery.page';

const routes: Routes = [
  {
    path: '',
    component: AddGroceryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddGroceryPageRoutingModule {}
