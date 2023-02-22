import {
  AsyncPipe,
  KeyValuePipe,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdornmentsStore } from './adornments.store';

@Component({
  selector: 'app-adornments',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    NgIf,
    AsyncPipe,
    NgFor,
    TitleCasePipe,
    KeyValuePipe,
  ],
  templateUrl: './adornments.page.html',
  styleUrls: ['./adornments.page.scss'],
  providers: [AdornmentsStore],
})
export default class AdornmentsComponent {
  @ViewChildren('adornmentSelect')
  private adornmentSelects?: QueryList<ElementRef<HTMLSelectElement>>;
  protected changedAdornments: Record<string, number> = {};

  constructor(protected store: AdornmentsStore) {}

  protected $string(value: unknown): string {
    return String(value);
  }

  protected updateChangedAdornments(): string[] {
    if (!this.adornmentSelects) {
      return;
    }

    this.changedAdornments = this.adornmentSelects
      .map((element) => element.nativeElement.value)
      .filter((value) => !!value)
      .reduce<Record<string, number>>((acc, current) => {
        acc[current] ??= 0;
        acc[current]++;
        return acc;
      }, {});
  }
}
