import { AsyncPipe, KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';
import { CensusService, QuestQuery } from '../census.service';
import { CharacterService } from '../character.service';
import { QuestIconComponent } from '../quest-icon/quest-icon.component';

type MultiZoneQuery = Record<string, QuestQuery>;

@Component({
  selector: 'app-vov-flawless',
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    AsyncPipe,
    NgFor,
    QuestIconComponent,
    KeyValuePipe,
  ],
  templateUrl: './vov-flawless.page.html',
  styleUrls: ['./vov-flawless.page.scss'],
})
export default class VovFlawlessPage {
  protected title = 'Visions of Vetrovia "Flawless"';
  protected dungeons = {
    'Non-Raid Achievements': {
      'Heroic I': { type: 'achievement', id: 4162523446 },
      'Heroic II': { type: 'achievement', id: 1628586124 },
      'Master of Vetrovia': { type: 'achievement', id: 2681141655 },
    },
    'Karuupa Jungle: The Fading Light': {
      'Quilliclaw (T1)': { type: 'achievement', id: 2030210416 },
      'Gluar Xrzin (T1)': { type: 'achievement', id: 2689579559 },
      'The Vetrovian Mantrap (T1)': { type: 'achievement', id: 1329913557 },
      'Behemothrus and Gargantaur (T2)': { type: 'achievement', id: 472440227 },
      'The Guardian of the Plumage (T2)': {
        type: 'achievement',
        id: 2764300147,
      },
    },
    'Mahngavi Wastes: The Engulfing Night': {
      'Cewtie (T1)': { type: 'achievement', id: 3507765080 },
      'Cliff Dweller Gadsin (T1)': { type: 'achievement', id: 4188149928 },
      'Persepherator (T1)': { type: 'achievement', id: 4287567854 },
      'Cewtie? (T2)': { type: 'achievement', id: 2897939876 },
      'The Legion Lords (T2)': { type: 'achievement', id: 3341839889 },
    },
    'Forlorn Gist: Emerging Deceit': {
      'Envoy to Bloodrite (T2)': { type: 'achievement', id: 56755689 },
      "G'dalt Spirit-stitcher (T2)": { type: 'achievement', id: 1387611581 },
      'The Hand of Lithania (T3)': { type: 'achievement', id: 1326012009 },
      'The Reanimated Horror (T3)': { type: 'achievement', id: 1316189009 },
      'Lithania Dyrmelia (T3)': { type: 'achievement', id: 417986812 },
    },
    'Castle Vacrul: Thirst for Power': {
      'The Lady of the Lute (T3)': { type: 'achievement', id: 2646401724 },
      'Legion Captain Bloodrite (T3)': { type: 'achievement', id: 1902962868 },
      'The Bloodtender and Gidget (T4)': {
        type: 'achievement',
        id: 1387471891,
      },
      'The Heir Apparent (T4)': { type: 'achievement', id: 151001061 },
      'The Thirstborn (T4)': { type: 'achievement', id: 818960137 },
    },
    'Castle Vacrul: Haunting Presence': {
      'The Butcher (T4)': { type: 'achievement', id: 4157760058 },
      'The Returned Foe of Legend (T4)': {
        type: 'achievement',
        id: 4058713937,
      },
      'The Vampire Queen (T4)': { type: 'achievement', id: 3562627241 },
      'Poppet the Thrasher (T4)': { type: 'achievement', id: 4281222609 },
      'The Lord of the Castle (T4)': { type: 'achievement', id: 1405493614 },
    },
  } satisfies MultiZoneQuery;

  protected dungeons$ = defer(() =>
    this.characterService.getAllCharacters()
  ).pipe(
    map((characters) => characters.map((c) => c.id)),
    map((ids) =>
      Object.entries(this.dungeons).map(([dungeon, quests]) => ({
        name: dungeon,
        results: this.census.queryQuestStatus(ids, quests),
        columns: Object.keys(quests),
      }))
    )
  );

  constructor(
    private readonly census: CensusService,
    private readonly characterService: CharacterService
  ) {}
}
