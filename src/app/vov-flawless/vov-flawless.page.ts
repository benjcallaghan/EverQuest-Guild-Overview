import { Component, OnInit } from '@angular/core';
import { defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-vov-flawless',
  templateUrl: './vov-flawless.page.html',
  styleUrls: ['./vov-flawless.page.scss'],
})
export class VovFlawlessPage {
  public refreshing = false;
  public characters$ = defer(() => {
    this.refreshing = true;
    return this.characterService.getAllCharacters();
  }).pipe(
    map((characters) => characters.map((c) => c.id)),
    switchMap((ids) =>
      this.census.queryQuestStatus(ids, {
        heroic1: { type: 'achievement', id: 4162523446 },
        heroic2: { type: 'achievement', id: 1628586124 },
        masterOfVetrovia: { type: 'achievement', id: 2681141655 },
        quilliclaw: { type: 'achievement', id: 2030210416 },
        glaurXrzin: { type: 'achievement', id: 2689579559 },
        vetrovianMantrap: { type: 'achievement', id: 1329913557 },
        behemothrusAndGargantaur: { type: 'achievement', id: 472440227 },
        guardianOfThePlumage: { type: 'achievement', id: 2764300147 },
        cewtie: { type: 'achievement', id: 3507765080 },
        cliffDwellerGadsin: { type: 'achievement', id: 4188149928 },
        persepherator: { type: 'achievement', id: 4287567854 },
        cewtie2: { type: 'achievement', id: 2897939876 },
        legionLords: { type: 'achievement', id: 3341839889 },
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
