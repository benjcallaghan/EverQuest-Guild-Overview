import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
    styleUrls: ['./settings.page.scss'],
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
        await this.characterService.add(character);
    }

    async remove(character: CensusCharacter): Promise<void> {
        await this.characterService.remove(character);
    }
}
