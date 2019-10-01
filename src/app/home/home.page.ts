import { Component } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public searchResults: any[];
	public myCharacters: any[] = [];
	public achievements: any[];

	constructor(private census: CensusService) { }

	public async search(name: string) {
		const results = await this.census.getCharacterByName(name);
		this.searchResults = results.character_list;
	}

	public add(character: any) {
		this.myCharacters.push(character);
	}

	public remove(character: any) {
		const index = this.myCharacters.indexOf(character);
		if (index > -1) {
			this.myCharacters.splice(index, 1);
		}
	}

	public async test() {
		const results = await this.census.getCharacterWithAchievements(
			this.myCharacters.map(c => c.id)
		);
		console.log(results);
		this.achievements = results.character_list;
	}
}
