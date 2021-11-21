import { Component } from '@angular/core';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { defer } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-reign-of-shadows',
  templateUrl: 'reign-of-shadows.page.html',
  styleUrls: ['reign-of-shadows.page.scss'],
})
export class ReignOfShadowsPage {
  public refreshing = false;
  public characters$ = defer(() => {
    this.refreshing = true;
    return this.characterService.getAllCharacters();
  }).pipe(
    map((characters) => characters.map((c) => c.id)),
    switchMap((ids) =>
      this.census.queryQuestStatus(ids, {
        echoCaverns: { type: 'quest', id: 1004769891 },
        shadeweaversThicket: { type: 'quest', id: 2733294553 },
        vexThal: { type: 'quest', id: 3589141327 },
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
