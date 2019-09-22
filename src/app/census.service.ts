import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { build } from './daybreak-census-options';

@Injectable({
	providedIn: 'root'
})
export class CensusService {

	constructor(private http: HttpClient) { }

	getCollections(): Promise<any> {
		const url = build({
			verb: 'get',
			namespace: 'eq2'
		});
		return this.http.get(url.href).toPromise();
	}

	getAchievements(): Promise<any> {
		const url = build({
			verb: 'get',
			namespace: 'eq2',
			collection: 'achievement',
			limit: 20,
			filter: [
				{ field: 'category', value: 'Raids' },
				{ field: 'subcategory', value: 'Chaos Descending' },
				{ field: 'name', value: 'Perfection', match: 'startsWith' }
			]
		});
		return this.http.get(url.href).toPromise();
	}

	getCharacter(): Promise<any> {
		const url = build({
			verb: 'get',
			namespace: 'eq2',
			collection: 'character',
			filter: [
				{ field: 'id', value: 438086903004 }
			],
			show: ['displayname', 'achievements']
		});
		return this.http.get(url.href).toPromise();
	}

	getCharacterWithAchievements(): Promise<any> {
		const url = build({
			serviceId: 's:benjadorncalculator',
			verb: 'get',
			namespace: 'eq2',
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
		return this.http.get(url.href).toPromise();
	}
}
