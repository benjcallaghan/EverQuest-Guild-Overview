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
			sort: [
				{ field: 'displayname' }
			],
			limit: 5
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
				{ field: 'category', value: 'Raids' },
				{ field: 'subcategory', value: 'Chaos Descending' },
				{ field: 'name', value: 'Perfection', match: 'startsWith' }
			]
		});
	}

	getCharacter(): Promise<any> {
		return this.runQuery({
			collection: 'character',
			filter: [
				{ field: 'id', value: 438086903004 },
				{ field: 'id', value: 438087725383 }
			],
			// show: ['displayname', 'achievements']
		});
	}

	getCharacterWithAchievements(): Promise<any> {
		return this.runQuery({
			collection: 'character',
			filter: [
				{ field: 'id', value: 438086903004 }
			],
			show: ['displayname', 'achievements.achievement_list'],
			join: [{
				type: 'achievement',
				on: 'achievements.achievement_list.id',
				to: 'id',
				inject_at: 'details',
				show: ['name', 'event_list']
			}]
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
