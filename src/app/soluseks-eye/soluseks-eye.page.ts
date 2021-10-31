import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CensusService, CensusCharacter, SolEyeCharacter } from '../census.service';

@Component({
  selector: 'app-soluseks-eye',
  templateUrl: './soluseks-eye.page.html',
  styleUrls: ['./soluseks-eye.page.scss'],
})
export class SoluseksEyePage implements OnInit {
  public characters: SolEyeCharacter[];
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
      this.characters = await this.census.getSoluseksEyeQuests(ids);
    } finally {
      this.refreshing = false;
    }
  }
}
