import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
    BehaviorSubject,
    from,
    map,
    mergeScan,
    Observable,
    of,
    share,
    tap,
} from 'rxjs';
import { CensusCharacter } from './census.service';
import { build } from './daybreak-census-options';

interface CharacterSearchResults {
    character_list: CensusCharacter[];
}

interface Command {
    execute(
        characters: CensusCharacter[],
        service: CharacterService
    ): Observable<CensusCharacter[]>;
}

class Initialize implements Command {
    execute(
        characters: CensusCharacter[],
        service: CharacterService
    ): Observable<CensusCharacter[]> {
        return from(service.getSavedCharacters());
    }
}

class Refresh implements Command {
    execute(
        characters: CensusCharacter[],
        service: CharacterService
    ): Observable<CensusCharacter[]> {
        return service.getOnlineCharacters(characters);
    }
}

class Add implements Command {
    constructor(private character: CensusCharacter) {}

    execute(
        characters: CensusCharacter[],
        service: CharacterService
    ): Observable<CensusCharacter[]> {
        return of([...characters, this.character]);
    }
}

class Remove implements Command {
    constructor(private character: CensusCharacter) {}

    execute(
        characters: CensusCharacter[],
        service: CharacterService
    ): Observable<CensusCharacter[]> {
        const index = characters.findIndex((c) => c.id === this.character.id);
        return of(index > -1 ? characters.toSpliced(index, 1) : characters);
    }
}

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    #refreshing = new BehaviorSubject<boolean>(false);
    refreshing$ = this.#refreshing.asObservable();

    #actions = new BehaviorSubject<Command>(new Initialize());
    characters$ = this.#actions.pipe(
        // TODO: Change to exhaustScan (an operator that doesn't exist)
        mergeScan(
            (characters, action) => action.execute(characters, this),
            [] as CensusCharacter[]
        ),
        tap((characters) =>
            characters.sort((a, b) =>
                a.displayname.localeCompare(b.displayname)
            )
        ),
        tap((characters) => this.saveCharacters(characters)),
        share({
            connector: () => new BehaviorSubject([] as CensusCharacter[]),
            resetOnRefCountZero: false,
        })
    );

    constructor(
        private readonly storage: Storage,
        private readonly http: HttpClient
    ) {}

    public getAllCharacters(): Promise<CensusCharacter[]> {
        return this.getSavedCharacters();
    }

    public async getSavedCharacters(): Promise<CensusCharacter[]> {
        return (await this.storage.get('characters')) ?? [];
    }

    public async saveCharacters(characters: CensusCharacter[]): Promise<void> {
        await this.storage.set('characters', characters);
    }

    public add(character: CensusCharacter): void {
        this.#actions.next(new Add(character));
    }

    public remove(character: CensusCharacter): void {
        this.#actions.next(new Remove(character));
    }

    public refreshOnline(): void {
        this.#actions.next(new Refresh());
    }

    public getOnlineCharacters(
        characters: CensusCharacter[]
    ): Observable<CensusCharacter[]> {
        const url = build({
            serviceId: 's:vexedencetracker',
            format: 'json',
            verb: 'get',
            namespace: 'eq2',
            collection: 'character',
            limit: characters.length,
            filter: [
                {
                    field: 'id',
                    value: characters.map((c) => c.id).join(','),
                },
            ],
            join: [
                {
                    type: 'character_misc',
                    on: 'id',
                    to: 'id',
                    inject_at: 'misc',
                    show: [
                        'completed_quest_list',
                        'quest_list',
                        'collection_list',
                    ],
                },
            ],
            tree: [
                { start: 'achievements.achievement_list', field: 'id' },
                { start: 'misc.quest_list', field: 'crc' },
                { start: 'misc.completed_quest_list', field: 'crc' },
                { start: 'misc.collection_list', field: 'crc' },
            ],
            show: [
                'displayname',
                'name',
                'guild',
                'achievements.achievement_list',
            ],
        });
        return this.http
            .get<CharacterSearchResults>(url.href)
            .pipe(map((data) => data.character_list));
    }
}
