import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterGroceryPage } from './filter-grocery.page';

const routes: Routes = [
  {
    path: '',
    component: FilterGroceryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterGroceryPageRoutingModule {}
