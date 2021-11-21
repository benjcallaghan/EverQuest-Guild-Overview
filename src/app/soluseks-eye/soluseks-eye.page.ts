import { Component, OnInit } from '@angular/core';
import { CensusService, QuestResults } from '../census.service';
import { CharacterService } from '../character.service';

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
    private readonly characterService: CharacterService
  ) {}

  async ngOnInit(): Promise<void> {
    this.refreshing = true;
    try {
      const characters = await this.characterService.getAllCharacters();
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
