import { Component } from '@angular/core';
import { CensusService } from '../census.service';
import { Character } from '../character';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public characters: Character[] = [];
	public searchResults: any[] = [];
	public searching = false;
	public refreshing = false;

	constructor(private census: CensusService) { }

	public async refresh() {
		this.refreshing = true;
		try {
			this.characters = await this.census.getLeyOfTheLandProgress(this.characters);
		} finally {
			this.refreshing = false;
		}
	}

	public async search(name: string) {
		this.searching = true;
		try {
			const results = await this.census.getCharacterByName(name);
			this.searchResults = results.character_list;
		} finally {
			this.searching = false;
		}
	}

	public add(character: any) {
		this.characters.push({
			id: character.id,
			name: character.name.first,
			blinding: { icon: 'help', tooltip: 'Refresh to load data' },
			aurelianCoast: { icon: 'help', tooltip: 'Refresh to load data' },
			sanctusSeru: { icon: 'help', tooltip: 'Refresh to load data' },
			fordelMidst: { icon: 'help', tooltip: 'Refresh to load data' },
			wracklands: { icon: 'help', tooltip: 'Refresh to load data' },
			hallowedHalls: { icon: 'help', tooltip: 'Refresh to load data' },
		});
	}
}
