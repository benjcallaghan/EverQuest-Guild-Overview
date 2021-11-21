import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { CensusCharacter } from './census.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private readonly storage: Storage) {}

  public async getAllCharacters(): Promise<CensusCharacter[]> {
    return (await this.storage.get('characters')) ?? [];
  }

  public async saveCharacters(characters: CensusCharacter[]): Promise<void> {
    await this.storage.set('characters', characters);
  }
}
