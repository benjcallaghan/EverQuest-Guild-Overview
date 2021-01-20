import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private characters: any[];

  public saveCharacters(characters: any[]) {
    this.characters = characters;
  }

  public loadCharacters(): any[] {
    return this.characters;
  }
}
