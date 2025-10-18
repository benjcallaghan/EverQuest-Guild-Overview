import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { asapScheduler, defer, Observable } from 'rxjs';
import { map, subscribeOn, tap } from 'rxjs/operators';
import { CensusCharacter, CensusService } from '../census.service';
import { CharacterService } from '../character.service';

@Component({
    selector: 'app-settings',
    imports: [IonicModule, FormsModule, NgIf, NgFor, AsyncPipe],
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export default class SettingsPage {
  searching = false;
  searchName: string;
  searchServer: number;
  searchResults$: Observable<CensusCharacter[]>;
  selected: Observable<CensusCharacter[]> = this.characterService.characters$;

  constructor(
    private readonly census: CensusService,
    private readonly characterService: CharacterService
  ) {}

  async searchForCharacter(): Promise<void> {
    this.searchResults$ = defer(() => {
      this.searching = true;
      return this.census.getCharactersByName(
        this.searchName,
        this.searchServer
      );
    }).pipe(
      subscribeOn(asapScheduler),
      map((data) => data.character_list),
      tap({
        next: () => (this.searching = false),
        error: () => (this.searching = false),
      })
    );
  }

  async add(character: CensusCharacter): Promise<void> {
    // if (this.selected.every((c) => c.id !== character.id)) {
    //   this.selected.push(character);
    //   this.selected.sort((a, b) => a.displayname.localeCompare(b.displayname));
    // }

    // await this.characterService.saveCharacters(this.selected);
  }

  async remove(index: number): Promise<void> {
    // this.selected.splice(index, 1);
    // this.selected.sort((a, b) => a.displayname.localeCompare(b.displayname));

    // await this.characterService.saveCharacters(this.selected);
  }
}
