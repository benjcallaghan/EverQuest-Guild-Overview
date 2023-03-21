import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { defer, Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { CensusService, QuestQuery } from '../census.service';
import { CharacterService } from '../character.service';
import { QuestIconComponent } from '../quest-icon/quest-icon.component';

type MultiZoneQuery = Record<string, QuestQuery>;

export type QuestStatusRouteData = {
  title: string;
  query: MultiZoneQuery;
};

@Component({
  selector: 'app-quest-status',
  standalone: true,
  imports: [IonicModule, AsyncPipe, NgFor, QuestIconComponent],
  templateUrl: './quest-status.page.html',
  styleUrls: ['./quest-status.page.scss'],
})
export default class QuestStatusPage {
  private readonly census = inject(CensusService);
  private readonly characterService = inject(CharacterService);
  private readonly routeData$ = inject(ActivatedRoute)
    .data as Observable<QuestStatusRouteData>;

  protected readonly title$ = this.routeData$.pipe(map((data) => data.title));
  protected readonly dungeons$ = defer(() =>
    this.characterService.getAllCharacters()
  ).pipe(
    map((characters) => characters.map((c) => c.id)),
    withLatestFrom(this.routeData$),
    map(([ids, data]) =>
      Object.entries(data.query).map(([dungeon, quests]) => ({
        name: dungeon,
        results: this.census.queryQuestStatus(ids, quests),
        columns: Object.keys(quests),
      }))
    )
  );
}
