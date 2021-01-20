import { Component, OnInit } from '@angular/core';
import { CensusService } from '../census.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-table',
  templateUrl: 'table.page.html',
  styleUrls: ['table.page.scss'],
})
export class TablePage implements OnInit {
  public searchResults: any;

  constructor(private census: CensusService, private storage: StorageService) {}

  async ngOnInit() {
    const characters = this.storage.loadCharacters();
    this.searchResults = await this.census.getCharacters(
      characters.filter((c) => c.selected)
    );
    console.log(this.searchResults);

    setInterval(() => {
      for (const character of this.searchResults.character_list) {
        character.online = Math.random() > 0.5;
      }
    }, 5000);
  }
}
