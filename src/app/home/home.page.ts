import { Component, OnInit } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
	public characters: any[] = [];

	constructor(private census: CensusService) { }

	async ngOnInit() {
		let results = await this.census.getCollections();
		console.log(results);

		results = await this.census.getQuests();
		console.log(results);

		results = await this.census.getBenj();
		console.log(results);

		this.characters = await this.census.getLeyOfTheLandProgress([
			{ id: 438086903004, name: 'Benj' },
			{ id: 450973806874, name: 'Piggle' }
		]);
	}
}
