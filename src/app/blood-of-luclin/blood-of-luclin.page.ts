import { Component } from '@angular/core';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { defer } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-blood-of-luclin',
  templateUrl: 'blood-of-luclin.page.html',
  styleUrls: ['blood-of-luclin.page.scss'],
})
export class BloodOfLuclinPage {
  public refreshing = false;
  public characters$ = defer(() => {
    this.refreshing = true;
    return this.characterService.getAllCharacters();
  }).pipe(
    map((characters) => characters.map((c) => c.id)),
    switchMap((ids) =>
      this.census.queryQuestStatus(ids, {
        blinding: { type: 'quest', id: 2233296293 },
        aurelianCoast: { type: 'quest', id: 471086111 },
        sanctusSeru: { type: 'quest', id: 1796408457 },
        fordelMidst: { type: 'quest', id: 4118253866 },
        wracklands: { type: 'quest', id: 2188419516 },
        hallowedHalls: { type: 'quest', id: 460976134 },
        bolChallenge: { type: 'quest', id: 1820246160 },
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
