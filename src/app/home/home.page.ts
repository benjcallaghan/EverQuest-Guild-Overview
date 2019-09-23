import { Component } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public searchResults: any[];

	constructor(private census: CensusService) { }

	public async search(name: string) {
		const results = await this.census.getCharacterByName(name);
		this.searchResults = results.character_list;
	}
}
