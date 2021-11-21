import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  CensusService,
  CensusCharacter,
  QuestResults,
} from '../census.service';

@Component({
  selector: 'app-blood-of-luclin',
  templateUrl: 'blood-of-luclin.page.html',
  styleUrls: ['blood-of-luclin.page.scss'],
})
export class BloodOfLuclinPage implements OnInit {
  private static readonly quests = {
    blinding: { type: 'quest', id: 2233296293 },
    aurelianCoast: { type: 'quest', id: 471086111 },
    sanctusSeru: { type: 'quest', id: 1796408457 },
    fordelMidst: { type: 'quest', id: 4118253866 },
    wracklands: { type: 'quest', id: 2188419516 },
    hallowedHalls: { type: 'quest', id: 460976134 },
    bolChallenge: { type: 'quest', id: 1820246160 },
  } as const;

  public characters: QuestResults<typeof BloodOfLuclinPage.quests>;
  public refreshing = false;

  constructor(
    private readonly census: CensusService,
    private readonly storage: Storage
  ) {}

  async ngOnInit(): Promise<void> {
    this.refreshing = true;
    try {
      const characters: CensusCharacter[] =
        (await this.storage.get('characters')) ?? [];
      const ids = characters.map((c) => c.id);
      this.characters = await this.census.queryQuestStatus(
        ids,
        BloodOfLuclinPage.quests
      );
    } finally {
      this.refreshing = false;
    }
  }
}
