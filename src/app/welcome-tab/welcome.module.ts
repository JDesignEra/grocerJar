import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WelcomeTabPage } from './welcome.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WelcomeTabPageRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    WelcomeTabPageRoutingModule
  ],
  declarations: [WelcomeTabPage]
})
export class WelcomeTabPageModule {}
