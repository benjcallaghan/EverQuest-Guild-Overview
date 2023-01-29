import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { QuestIconComponent } from '../quest-icon/quest-icon.component';

@Component({
  selector: 'app-vov-flawless',
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe, NgFor, QuestIconComponent],
  templateUrl: './vov-flawless.page.html',
  styleUrls: ['./vov-flawless.page.scss'],
})
export default class VovFlawlessPage {
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
        envoyToBloodrite: { type: 'achievement', id: 56755689 },
        gdaltSpiritStitcher: { type: 'achievement', id: 1387611581 },
        handOfLithania: { type: 'achievement', id: 1326012009 },
        reanimatedHorror: { type: 'achievement', id: 1316189009 },
        lithaniaDyrmelia: { type: 'achievement', id: 417986812 },
        ladyOfTheLute: { type: 'achievement', id: 2646401724 },
        legionCaptainBloodrite: { type: 'achievement', id: 1902962868 },
        bloodtenderAndGidget: { type: 'achievement', id: 1387471891 },
        heirApparent: { type: 'achievement', id: 151001061 },
        thirstborn: { type: 'achievement', id: 818960137 },
        butcher: { type: 'achievement', id: 4157760058 },
        returnedFoeOfLegend: { type: 'achievement', id: 4058713937 },
        vampireQueen: { type: 'achievement', id: 3562627241 },
        poppetTheThrasher: { type: 'achievement', id: 4281222609 },
        lordOfTheCastle: { type: 'achievement', id: 1405493614 },
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
