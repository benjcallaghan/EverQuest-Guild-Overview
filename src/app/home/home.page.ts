import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CensusService } from '../census.service';
import { Character } from '../character';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public characters: Character[] = [];
    public searchResults: any[] = [];
    public searching = false;
    public refreshing = false;

    constructor(private census: CensusService, private storage: Storage) { }

    async ngOnInit() {
        this.characters = await this.storage.get('characters') ?? [];
    }

    public async refresh() {
        this.refreshing = true;
        try {
            this.characters = await this.census.getQuests(this.characters);
            await this.storage.set('characters', this.characters);
        } finally {
            this.refreshing = false;
        }
    }

    public async search(name: string | number) {
        this.searching = true;
        try {
            const results = await this.census.getCharacterByName(name as string);
            this.searchResults = results.character_list;
        } finally {
            this.searching = false;
        }
    }

    public async add(character: any) {
        this.characters.push({
            id: character.id,
            name: character.name.first,
            weekly: { status: 'unknown' },
            blinding: { status: 'unknown' },
            aurelianCoast: { status: 'unknown' },
            sanctusSeru: { status: 'unknown' },
            fordelMidst: { status: 'unknown' },
            wracklands: { status: 'unknown' },
            hallowedHalls: { status: 'unknown' },
            bolChallenge: { status: 'unknown' },
            answerTheCall: { status: 'unknown' },
            volcanicThreats: { status: 'unknown' },
            theFireWithin: { status: 'unknown' },
            windingDescent: { status: 'unknown' },
            indispensableComponents: { status: 'unknown' },
            formulaForSuccess: { status: 'unknown' },
        });
        await this.storage.set('characters', this.characters);
    }

    public async remove(index: number) {
        this.characters.splice(index, 1);
        await this.storage.set('characters', this.characters);
    }
}
