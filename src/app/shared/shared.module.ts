import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestIconComponent } from './quest-icon/quest-icon.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    QuestIconComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    QuestIconComponent
  ]
})
export class SharedModule { }
