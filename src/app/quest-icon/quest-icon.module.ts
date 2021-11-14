import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuestIconComponent } from './quest-icon.component';

@NgModule({
  declarations: [QuestIconComponent],
  imports: [CommonModule, IonicModule],
  exports: [QuestIconComponent],
})
export class QuestIconModule {}
