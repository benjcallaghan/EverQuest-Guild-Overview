import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesOfProphecyPageRoutingModule } from './planes-of-prophecy-routing.module';

import { PlanesOfProphecyPage } from './planes-of-prophecy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesOfProphecyPageRoutingModule
  ],
  declarations: [PlanesOfProphecyPage]
})
export class PlanesOfProphecyPageModule {}
