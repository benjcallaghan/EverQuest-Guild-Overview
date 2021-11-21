import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  CensusService,
  CensusCharacter,
  QuestResults,
} from '../census.service';

@Component({
  selector: 'app-soluseks-eye',
  templateUrl: './soluseks-eye.page.html',
  styleUrls: ['./soluseks-eye.page.scss'],
})
export class SoluseksEyePage implements OnInit {
  private static readonly quests = {
    answerTheCall: { type: 'achievement', id: 4101718547 },
    volcanicThreats: { type: 'quest', id: 179143310 },
    theFireWithin: { type: 'collection', id: 2997731257 },
    windingDescent: { type: 'quest', id: 384548791 },
    indispensableComponents: { type: 'quest', id: 2414013965 },
    formulaForSuccess: { type: 'quest', id: 4175814299 },
  } as const;

  public characters: QuestResults<typeof SoluseksEyePage.quests>;
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
        SoluseksEyePage.quests
      );
    } finally {
      this.refreshing = false;
    }
  }
}
