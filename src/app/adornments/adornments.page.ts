import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdornmentsStore } from './adornments.store';

@Component({
  selector: 'app-adornments',
  standalone: true,
  imports: [IonicModule, FormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './adornments.page.html',
  styleUrls: ['./adornments.page.scss'],
  providers: [AdornmentsStore],
})
export default class AdornmentsComponent {
  constructor(protected store: AdornmentsStore) {}

  protected $string(value: unknown): string {
    return String(value);
  }
}
