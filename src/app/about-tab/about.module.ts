import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutTabPage } from './about.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { AboutTabPageRoutingModule } from './about-routing.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: AboutTabPage }]),
    AboutTabPageRoutingModule,
  ],
  declarations: [AboutTabPage]
})
export class AboutTabPageModule {}
