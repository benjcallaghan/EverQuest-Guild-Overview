import { Component, ViewChild, ViewChildren } from '@angular/core';
import { IonInput, IonChip } from '@ionic/angular';

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

  public addGuild() {
    this.guilds.add(this.guildInput.value);
    this.guildInput.value = '';
  }

  public removeGuild(guild: string) {
    this.guilds.delete(guild);
  }
}
