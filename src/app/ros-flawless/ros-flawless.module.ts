import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RosFlawlessPageRoutingModule } from './ros-flawless-routing.module';

import { RosFlawlessPage } from './ros-flawless.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RosFlawlessPageRoutingModule,
    SharedModule,
  ],
  declarations: [RosFlawlessPage],
})
export class RosFlawlessPageModule {}
