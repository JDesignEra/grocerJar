import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditGroceryPage } from './edit-grocery.page';

const routes: Routes = [
  {
    path: '',
    component: EditGroceryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditGroceryPageRoutingModule {}
