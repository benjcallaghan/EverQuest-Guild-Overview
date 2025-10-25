import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
    BehaviorSubject,
    exhaustMap,
    map,
    Observable,
    Subject,
    Subscription,
    tap,
} from 'rxjs';
import { CensusCharacter } from './census.service';
import { build } from './daybreak-census-options';

interface CharacterSearchResults {
    character_list: CensusCharacter[];
}

@Injectable({
    providedIn: 'root',
})
export class CharacterService implements OnDestroy {
    #refresh = new Subject<void>();
    #refreshSubscription: Subscription;
    #refreshing = new BehaviorSubject<boolean>(false);
    refreshing$ = this.#refreshing.asObservable();

    #characters = new BehaviorSubject<CensusCharacter[]>([]);
    characters$ = this.#characters.asObservable();

    constructor(
        private readonly storage: Storage,
        private readonly http: HttpClient
    ) {
        this.getAllCharacters().then((characters) =>
            this.#characters.next(characters)
        );
        this.#refreshSubscription = this.#refresh
            .pipe(
                tap(() => this.#refreshing.next(true)),
                exhaustMap(() => this.getCharactersOnline()),
                tap(() => this.#refreshing.next(false))
            )
            .subscribe(async (refreshed) => {
                this.#characters.next(refreshed);
                await this.saveCharacters(refreshed);
            });
    }

    ngOnDestroy(): void {
        this.#refreshSubscription.unsubscribe();
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
        const index = characters.findIndex((c) => c.id === character.id);
        if (index > -1) {
            characters.splice(index, 1);
            this.#characters.next(characters);
            await this.saveCharacters(characters);
        }
    }

    public refreshOnline(): void {
        this.#refresh.next();
    }

    private getCharactersOnline(): Observable<CensusCharacter[]> {
        const characters = this.#characters.value;
        const url = build({
            serviceId: 's:vexedencetracker',
            format: 'json',
            verb: 'get',
            namespace: 'eq2',
            collection: 'character',
            limit: characters.length,
            filter: [
                { field: 'id', value: characters.map((c) => c.id).join(',') },
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
        return this.http.get<CharacterSearchResults>(url.href).pipe(
            map((data) => {
                const refreshed = data.character_list;
                refreshed.sort((a, b) =>
                    a.displayname.localeCompare(b.displayname)
                );
                return refreshed;
            })
        );
    }
}
