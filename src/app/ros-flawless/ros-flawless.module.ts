import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RosFlawlessPageRoutingModule } from './ros-flawless-routing.module';

import { RosFlawlessPage } from './ros-flawless.page';
import { QuestIconModule } from '../quest-icon/quest-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RosFlawlessPageRoutingModule,
    QuestIconModule,
  ],
  declarations: [RosFlawlessPage],
})
export class RosFlawlessPageModule {}
