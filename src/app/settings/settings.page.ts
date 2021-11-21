import { Component, OnInit } from '@angular/core';
import { CensusService, CensusCharacter } from '../census.service';
import { CharacterService } from '../character.service';
import { Observable, defer, asapScheduler } from 'rxjs';
import { map, tap, observeOn, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  searching = false;
  searchName: string;
  searchServer: number;
  searchResults$: Observable<CensusCharacter[]>;
  selected: CensusCharacter[];

  constructor(
    private readonly census: CensusService,
    private readonly characterService: CharacterService
  ) {}

  async ngOnInit(): Promise<void> {
    this.selected = await this.characterService.getAllCharacters();
  }

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
    if (this.selected.every((c) => c.id !== character.id)) {
      this.selected.push(character);
      this.selected.sort((a, b) => a.displayname.localeCompare(b.displayname));
    }

    await this.characterService.saveCharacters(this.selected);
  }

  async remove(index: number): Promise<void> {
    this.selected.splice(index, 1);
    this.selected.sort((a, b) => a.displayname.localeCompare(b.displayname));

    await this.characterService.saveCharacters(this.selected);
  }
}
