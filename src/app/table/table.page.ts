import { Component } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-table',
	templateUrl: 'table.page.html',
	styleUrls: ['table.page.scss'],
})
export class TablePage {
	public searchResults: any[];
	public myCharacters: any[] = [];
	public achievements: any[];
	public stats: any[];

	constructor(private census: CensusService) { }

	public async test() {
		const results = await this.census.getCharacterWithAchievements(
			this.myCharacters.map(c => c.id)
		);
		console.log(results);
		this.achievements = results.character_list;
	}
}
