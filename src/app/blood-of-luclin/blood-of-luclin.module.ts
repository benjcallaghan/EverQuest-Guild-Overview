import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { BloodOfLuclinPage } from './blood-of-luclin.page';
import { QuestIconModule } from '../quest-icon/quest-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: BloodOfLuclinPage,
      },
    ]),
    QuestIconModule,
  ],
  declarations: [BloodOfLuclinPage],
})
export class BloodOfLuclinPageModule {}
