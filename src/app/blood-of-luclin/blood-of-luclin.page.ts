import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CensusService, CensusCharacter, BolCharacter } from '../census.service';

@Component({
  selector: 'app-blood-of-luclin',
  templateUrl: 'blood-of-luclin.page.html',
  styleUrls: ['blood-of-luclin.page.scss'],
})
export class BloodOfLuclinPage implements OnInit {
  public characters: BolCharacter[];
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
      this.characters = await this.census.getBloodOfLuclinQuests(ids);
    } finally {
      this.refreshing = false;
    }
  }
}
