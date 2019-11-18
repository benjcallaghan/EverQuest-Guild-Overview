import { Component, ViewChild, ViewChildren } from '@angular/core';
import { IonInput, IonChip } from '@ionic/angular';
import { CensusService } from '../census.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage {
  @ViewChild(IonInput, { static: true }) guildInput: IonInput;

  public servers = [
    'Antonia Bayle',
    'Beta',
    'Halls of Fate',
    'Isle of Refuge',
    'Kaladim',
    'Maj\' Dul',
    'Rivervale',
    'Skyfire',
    'Test',
    'Thurgadin'
  ];

  public guilds = new Set<string>();

  constructor(private census: CensusService) { }

  public addGuild() {
    this.guilds.add(this.guildInput.value);
    this.guildInput.value = '';
  }

  public removeGuild(guild: string) {
    this.guilds.delete(guild);
  }

  public async testService() {
    const temp = await this.census.getGuilds('', []);
  }
}
