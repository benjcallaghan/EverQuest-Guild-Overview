import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { QuestIconComponent } from '../quest-icon/quest-icon.component';

@Component({
  selector: 'app-reign-of-shadows',
  standalone: true,
  imports: [NgFor, AsyncPipe, IonicModule, QuestIconComponent, NgIf],
  templateUrl: 'reign-of-shadows.page.html',
  styleUrls: ['reign-of-shadows.page.scss'],
})
export default class ReignOfShadowsPage {
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
