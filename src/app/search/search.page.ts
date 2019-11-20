import { Component, ViewChild } from '@angular/core';
import { IonInput, IonSelect } from '@ionic/angular';
import { CensusService } from '../census.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss'],
})
export class SearchPage {
	@ViewChild(IonSelect, { static: true }) serverInput: IonSelect;
	@ViewChild(IonInput, { static: true }) guildInput: IonInput;

	public servers = [
		'Antonia Bayle',
		'Beta',
		'Halls of Fate',
		'Isle of Refuge',
		'Kaladim',
		'Maj\'Dul',
		'Rivervale',
		'Skyfire',
		'Test',
		'Thurgadin'
	];
	public guilds = new Set<string>();
	public searchResults: any;
	public filteredPlayers: any[];

	constructor(private census: CensusService) { }

	public addGuild() {
		this.guilds.add(this.guildInput.value);
		this.guildInput.value = '';
	}

	public removeGuild(guild: string) {
		this.guilds.delete(guild);
	}

	public async search() {
		this.searchResults = await this.census.getGuilds(this.serverInput.value, [...this.guilds]);
		this.filteredPlayers = flatten(this.searchResults.guild_list.map(guild => guild.member_list));
	}

	public filterChange(searchName: string) {
		this.filteredPlayers = flatten<any>(this.searchResults.guild_list.map(guild => guild.member_list))
			.filter(player => player.name.toLowerCase().includes(searchName.toLowerCase()));
	}
}

function flatten<T>(arr: T[][]): T[] {
	return Array.prototype.concat.apply([], arr);
}
