import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoluseksEyePageRoutingModule } from './soluseks-eye-routing.module';

import { SoluseksEyePage } from './soluseks-eye.page';
import { QuestIconModule } from '../quest-icon/quest-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoluseksEyePageRoutingModule,
    QuestIconModule
  ],
  declarations: [SoluseksEyePage]
})
export class SoluseksEyePageModule {}
