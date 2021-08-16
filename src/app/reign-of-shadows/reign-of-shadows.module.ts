import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReignOfShadowsPage } from './reign-of-shadows.page';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

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
    SharedModule,
  ],
  declarations: [ReignOfShadowsPage],
})
export class ReignOfShadowsPageModule {}
