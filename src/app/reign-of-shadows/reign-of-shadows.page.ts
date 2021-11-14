import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  CensusService,
  CensusCharacter,
  CensusResults,
} from '../census.service';

@Component({
  selector: 'app-reign-of-shadows',
  templateUrl: 'reign-of-shadows.page.html',
  styleUrls: ['reign-of-shadows.page.scss'],
})
export class ReignOfShadowsPage implements OnInit {
  private static readonly quests = {
    echoCaverns: { type: 'quest', id: 1004769891 },
    shadeweaversThicket: { type: 'quest', id: 2733294553 },
    vexThal: { type: 'quest', id: 3589141327 },
  } as const;

  public characters: CensusResults<typeof ReignOfShadowsPage.quests>;
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
      this.characters = await this.census.queryCurrentStatus(
        ids,
        ReignOfShadowsPage.quests
      );
    } finally {
      this.refreshing = false;
    }
  }
}
