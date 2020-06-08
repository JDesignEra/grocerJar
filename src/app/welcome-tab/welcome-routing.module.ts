import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeTabPage } from './welcome.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeTabPageRoutingModule {}
