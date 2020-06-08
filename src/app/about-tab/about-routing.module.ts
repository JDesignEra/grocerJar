import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutTabPage } from './about.page';

const routes: Routes = [
  {
    path: '',
    component: AboutTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutTabPageRoutingModule {}
