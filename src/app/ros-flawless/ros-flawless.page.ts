import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RosFlawlessCharacter, CensusService, CensusCharacter } from '../census.service';

@Component({
  selector: 'app-ros-flawless',
  templateUrl: './ros-flawless.page.html',
  styleUrls: ['./ros-flawless.page.scss'],
})
export class RosFlawlessPage implements OnInit {
  public characters: RosFlawlessCharacter[];
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
      this.characters = await this.census.getReignOfShadowsFlawlessQuests(ids);
    } finally {
      this.refreshing = false;
    }
  }
}
