import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReignOfShadowsPage } from './reign-of-shadows.page';
import { RouterModule } from '@angular/router';
import { QuestIconModule } from '../quest-icon/quest-icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReignOfShadowsPage,
      },
    ]),
    QuestIconModule,
  ],
  declarations: [ReignOfShadowsPage],
})
export class ReignOfShadowsPageModule {}
