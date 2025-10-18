import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { defer, ReplaySubject, share } from 'rxjs';
import { CensusCharacter } from './census.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  characters$ = defer(() => this.getAllCharacters()).pipe(
    share({
      connector: () => new ReplaySubject(1),
      resetOnRefCountZero: false
    })
  );

  constructor(private readonly storage: Storage) {}

  public async getAllCharacters(): Promise<CensusCharacter[]> {
    return (await this.storage.get('characters')) ?? [];
  }

  public async saveCharacters(characters: CensusCharacter[]): Promise<void> {
    await this.storage.set('characters', characters);
  }
}
