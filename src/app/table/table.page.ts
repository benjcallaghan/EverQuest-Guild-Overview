import { Component, OnInit } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-table',
	templateUrl: 'table.page.html',
	styleUrls: ['table.page.scss'],
})
export class TablePage implements OnInit {
	public searchResults: any[];
	public myCharacters: any[] = [];
	public achievements: any[];
	public stats: any[];

	constructor(private census: CensusService) { }

	async ngOnInit() {
		const results = await this.census.getCharacterWithAchievements(
			this.myCharacters.map(c => c.id)
		);
		console.log(results);
		this.achievements = results.character_list;
		this.stats = [
			{
				displayname: 'Hello',
				hp: 200,
				resolve: 200,
				potency: 200,
				online: true
			}
		];
	}
}
