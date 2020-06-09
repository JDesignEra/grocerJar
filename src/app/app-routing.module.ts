import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-grocery',
    loadChildren: () => import('./add-grocery/add-grocery.module').then( m => m.AddGroceryPageModule)
  },
  {
    path: 'edit-grocery/:id',
    loadChildren: () => import('./edit-grocery/edit-grocery.module').then( m => m.EditGroceryPageModule)
  },  {
    path: 'filter-grocery',
    loadChildren: () => import('./filter-grocery/filter-grocery.module').then( m => m.FilterGroceryPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
