import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { asapScheduler, defer, Observable } from 'rxjs';
import { subscribeOn, tap } from 'rxjs/operators';
import { CensusService, CharacterWithAdorns } from '../census.service';

@Component({
  selector: 'app-adornments',
  standalone: true,
  imports: [IonicModule, FormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './adornments.page.html',
  styleUrls: ['./adornments.page.scss'],
})
export default class AdornmentsComponent {
  protected searchName?: string;
  protected searchServer?: number;
  protected searching = false;
  protected character$: Observable<CharacterWithAdorns>;

  constructor(private census: CensusService) {}

  protected searchForCharacter(): void {
    this.character$ = defer(() => {
      this.searching = true;
      return this.census.getCharacterWithAdorns(
        this.searchName,
        this.searchServer
      );
    }).pipe(
      subscribeOn(asapScheduler),
      tap({
        next: () => (this.searching = false),
        error: () => (this.searching = false),
      })
    );
  }
}
