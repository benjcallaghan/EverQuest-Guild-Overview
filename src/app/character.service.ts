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

type Action = (characters: CensusCharacter[]) => Observable<CensusCharacter[]>;

@Injectable({
    providedIn: 'root',
})
export class CharacterService {
    #refreshing = new BehaviorSubject<boolean>(false);
    refreshing$ = this.#refreshing.asObservable();

    #actions = new BehaviorSubject<Action>((_) =>
        from(this.getSavedCharacters())
    );
    characters$ = this.#actions.pipe(
        tap((_) => this.#refreshing.next(true)),
        // TODO: Change to exhaustScan (an operator that doesn't exist)
        mergeScan(
            (characters, action) => action(characters),
            [] as CensusCharacter[]
        ),
        tap((characters) =>
            characters.sort((a, b) =>
                a.displayname.localeCompare(b.displayname)
            )
        ),
        tap((characters) => this.saveCharacters(characters)),
        tap((_) => this.#refreshing.next(false)),
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

    private async getSavedCharacters(): Promise<CensusCharacter[]> {
        return (await this.storage.get('characters')) ?? [];
    }

    private async saveCharacters(characters: CensusCharacter[]): Promise<void> {
        await this.storage.set('characters', characters);
    }

    public add(character: CensusCharacter): void {
        this.#actions.next((characters) => of([...characters, character]));
    }

    public remove(character: CensusCharacter): void {
        this.#actions.next((characters) => {
            const index = characters.findIndex((c) => c.id === character.id);
            return of(index > -1 ? characters.toSpliced(index, 1) : characters);
        });
    }

    public refreshOnline(): void {
        this.#actions.next((characters) =>
            this.getOnlineCharacters(characters)
        );
    }

    private getOnlineCharacters(
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
