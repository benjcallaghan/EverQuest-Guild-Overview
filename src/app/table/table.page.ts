import { Component, OnInit } from '@angular/core';
import { CensusService } from '../census.service';
import { StorageService } from '../storage.service';

@Component({
	selector: 'app-table',
	templateUrl: 'table.page.html',
	styleUrls: ['table.page.scss'],
})
export class TablePage implements OnInit {
	public searchResults: any[];
	public achievements: any[];
	public stats: any[];

	constructor(private census: CensusService, private storage: StorageService) { }

	async ngOnInit() {
		const characters = this.storage.loadCharacters();
		this.searchResults = await this.census.getCharacters(characters.filter(c => c.selected));
		console.log(this.searchResults);
	}
}
