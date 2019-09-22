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
}
