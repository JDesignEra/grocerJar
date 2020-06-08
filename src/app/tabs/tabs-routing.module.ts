import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'groceries',
        loadChildren: () => import('../groceries-tab/groceries.module').then(m => m.GroceriesTabModule)
      },
      {
        path: 'welcome',
        loadChildren: () => import('../welcome-tab/welcome.module').then(m => m.WelcomeTabPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../about-tab/about.module').then(m => m.AboutTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/groceries',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
