import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VovFlawlessPageRoutingModule } from './vov-flawless-routing.module';

import { VovFlawlessPage } from './vov-flawless.page';
import { QuestIconModule } from '../quest-icon/quest-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VovFlawlessPageRoutingModule,
    QuestIconModule,
  ],
  declarations: [VovFlawlessPage],
})
export class VovFlawlessPageModule {}
