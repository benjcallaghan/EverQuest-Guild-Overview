import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';
import { CensusCharacter } from './census.service';

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    #characters = new BehaviorSubject<CensusCharacter[]>([]);
    characters$ = this.#characters.asObservable();

    constructor(private readonly storage: Storage) {
        this.getAllCharacters().then((characters) =>
            this.#characters.next(characters)
        );
    }

    public async getAllCharacters(): Promise<CensusCharacter[]> {
        return (await this.storage.get('characters')) ?? [];
    }

    public async saveCharacters(characters: CensusCharacter[]): Promise<void> {
        await this.storage.set('characters', characters);
    }

    public async add(character: CensusCharacter): Promise<void> {
        const characters = [...this.#characters.value, character];
        characters.sort((a, b) => a.displayname.localeCompare(b.displayname));
        this.#characters.next(characters);
        await this.saveCharacters(characters);
    }

    public async remove(character: CensusCharacter): Promise<void> {
        const characters = [...this.#characters.value];
        const index = characters.findIndex(c => c.id === character.id);
        if (index > -1) {
            characters.splice(index, 1);
            this.#characters.next(characters);
            await this.saveCharacters(characters);
        }
    }
}
