import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { build, CensusUrlOptions } from './daybreak-census-options';

@Injectable({
	providedIn: 'root'
})
export class CensusService {
	private defaultOptions: CensusUrlOptions = {
		serviceId: 's:benjadorncalculator', // TODO: Replace with vexedence value.
		verb: 'get',
		namespace: 'eq2'
	};

	constructor(private http: HttpClient) { }

	public getCharacterByName(name: string): Promise<any> {
		return this.runQuery({
			collection: 'character',
			filter: [
				{ field: 'name.first', value: name, match: 'startsWith' }
			],
			exactMatchFirst: true,
			caseSensitive: false,
			sort: [
				{ field: 'displayname' }
			],
			limit: 6
		});
	}

	getCollections(): Promise<any> {
		return this.runQuery({});
	}

	getAchievements(): Promise<any> {
		return this.runQuery({
			collection: 'achievement',
			limit: 20,
			filter: [
				{ field: 'category', value: 'Triumphs' },
				{ field: 'subcategory', value: 'Chaos Descending' },
				{ field: 'name', value: 'Triumph', match: 'startsWith' }
			]
		});
	}

	getCharacters(characters: any[]): Promise<any> {
		const dbid = characters.map(c => ({ field: 'dbid', value: c.dbid }));
		const names = characters.map(c => ({ field: 'name.first', value: c.name }));
		return this.runQuery({
			collection: 'character',
			filter: dbid.concat(names),
			limit: characters.length,
			show: ['stats', 'name'],
			sort: [{ field: 'name.first' }]
		});
	}

	getCharacterWithAchievements(characters: number[]): Promise<any> {
		return this.runQuery({
			collection: 'character',
			filter: characters.map(c => ({ field: 'id', value: c })),
			show: ['displayname', 'achievements.achievement_list'],
			join: [{
				type: 'achievement',
				on: 'achievements.achievement_list.id',
				to: 'id',
				inject_at: 'details',
				terms: [
					{ field: 'name', value: 'Triumph: Unmeltable!' },
					{ field: 'name', value: 'Triumph: Weathering the Upheaval' },
					{ field: 'name', value: 'Triumph: One With the Wind' },
				],
			}],
			tree: {
				field: 'id',
				start: 'achievements.achievement_list'
			},
			sort: [
				{ field: 'displayname' }
			]
		});
	}

	getGuilds(server: string, names: string[]): Promise<any> {
		const filter = names.map(name => ({ field: 'name', value: name }));
		filter.push({ field: 'world', value: server });

		return this.runQuery({
			collection: 'guild',
			filter,
			limit: names.length,
			show: ['name', 'member_list']
		});
	}

	private runQuery(options: Partial<CensusUrlOptions>): Promise<any> {
		const url = build({
			...this.defaultOptions,
			...options
		});
		return this.http.get(url.href).toPromise();
	}
}
