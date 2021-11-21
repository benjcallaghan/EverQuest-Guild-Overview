import { Component, OnInit } from '@angular/core';
import { CensusService, CensusCharacter } from '../census.service';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  searching = false;
  searchName: string;
  searchServer: number;
  searchResults: CensusCharacter[];
  selected: CensusCharacter[];

  constructor(
    private readonly census: CensusService,
    private readonly characterService: CharacterService
  ) {}

  async ngOnInit(): Promise<void> {
    this.selected = await this.characterService.getAllCharacters();
  }

  async searchForCharacter(): Promise<void> {
    this.searching = true;
    try {
      const { character_list } = await this.census.getCharactersByName(
        this.searchName,
        this.searchServer
      );
      this.searchResults = character_list;
    } finally {
      this.searching = false;
    }
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
