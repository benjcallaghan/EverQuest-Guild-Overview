import { Component } from '@angular/core';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-soluseks-eye',
  templateUrl: './soluseks-eye.page.html',
  styleUrls: ['./soluseks-eye.page.scss'],
})
export class SoluseksEyePage {
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
