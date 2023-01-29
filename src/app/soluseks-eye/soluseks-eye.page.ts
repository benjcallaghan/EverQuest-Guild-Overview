import { Component } from '@angular/core';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { QuestIconComponent } from '../quest-icon/quest-icon.component';

@Component({
  selector: 'app-soluseks-eye',
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, QuestIconComponent, NgIf],
  templateUrl: './soluseks-eye.page.html',
  styleUrls: ['./soluseks-eye.page.scss'],
})
export default class SoluseksEyePage {
  public refreshing = false;
  public characters$ = defer(() => {
    this.refreshing = true;
    return this.characterService.getAllCharacters();
  }).pipe(
    map((characters) => characters.map((c) => c.id)),
    switchMap((ids) =>
      this.census.queryQuestStatus(ids, {
        answerTheCall: { type: 'achievement', id: 4101718547 },
        volcanicThreats: { type: 'quest', id: 179143310 },
        theFireWithin: { type: 'collection', id: 2997731257 },
        windingDescent: { type: 'quest', id: 384548791 },
        indispensableComponents: { type: 'quest', id: 2414013965 },
        formulaForSuccess: { type: 'quest', id: 4175814299 },
      })
    ),
    tap({
      next: () => (this.refreshing = false),
      error: () => (this.refreshing = false),
    })
  );

  constructor(
    private readonly census: CensusService,
    private readonly characterService: CharacterService
  ) {}
}
