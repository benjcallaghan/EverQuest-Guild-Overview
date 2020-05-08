import { Component, ViewChild } from '@angular/core';
import { IonInput, IonSelect } from '@ionic/angular';
import { CensusService } from '../census.service';
import { StorageService } from '../storage.service';

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

	constructor(private census: CensusService, private storage: StorageService) { }

	public addGuild() {
		this.guilds.add(this.guildInput.value as string);
		this.guildInput.value = '';
	}

	public removeGuild(guild: string) {
		this.guilds.delete(guild);
	}

	public async search() {
		this.searchResults = await this.census.getGuilds(this.serverInput.value, [...this.guilds]);
		this.filteredPlayers = flatten<any>(this.searchResults.guild_list.map(guild => guild.member_list))
			.sort((x, y) => x.name.localeCompare(y.name));
		this.storage.saveCharacters(this.filteredPlayers);
	}

	public filterChange(searchName: string) {
		this.filteredPlayers = flatten<any>(this.searchResults.guild_list.map(guild => guild.member_list))
			.filter(player => player.name.toLowerCase().includes(searchName.toLowerCase()))
			.sort((x, y) => x.name.localeCompare(y.name));
	}
}

function flatten<T>(arr: T[][]): T[] {
	return Array.prototype.concat.apply([], arr);
}
