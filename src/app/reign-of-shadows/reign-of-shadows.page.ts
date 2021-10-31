import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {
  CensusService,
  CensusCharacter,
  RosCharacter,
} from '../census.service';

@Component({
  selector: 'app-reign-of-shadows',
  templateUrl: 'reign-of-shadows.page.html',
  styleUrls: ['reign-of-shadows.page.scss'],
})
export class ReignOfShadowsPage implements OnInit {
  public characters: RosCharacter[];
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
      this.characters = await this.census.getReignOfShadowsQuests(ids);
    } finally {
      this.refreshing = false;
    }
  }
}
