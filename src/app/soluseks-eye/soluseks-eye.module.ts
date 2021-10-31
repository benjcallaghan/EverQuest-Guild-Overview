import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoluseksEyePageRoutingModule } from './soluseks-eye-routing.module';

import { SoluseksEyePage } from './soluseks-eye.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoluseksEyePageRoutingModule,
    SharedModule
  ],
  declarations: [SoluseksEyePage]
})
export class SoluseksEyePageModule {}
