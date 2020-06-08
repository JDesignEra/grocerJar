import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroceriesPage } from './groceries.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GroceriesPageRoutingModule } from './groceries-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GroceriesPageRoutingModule
  ],
  declarations: [GroceriesPage]
})
export class GroceriesTabModule {}
