import { Component } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public data: any;

	constructor(private census: CensusService) { }

	public async makeRequest() {
		this.data = await this.census.getCollections();
	}
}
