import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { build, CensusUrlOptions } from './daybreak-census-options';
import { Character, QuestStatus } from './character';

@Injectable({
    providedIn: 'root'
})
export class CensusService {
    private defaultOptions: CensusUrlOptions = {
        serviceId: 's:benjadorncalculator',
        verb: 'get',
        namespace: 'eq2'
    };

    constructor(private http: HttpClient) { }

    public getCharacterByName(name: string): Promise<any> {
        return this.runQuery({
            collection: 'character',
            filter: [
                { field: 'name.first_lower', value: name.toLowerCase(), match: 'startsWith' }
            ],
            exactMatchFirst: true,
            sort: [
                { field: 'displayname' }
            ],
            show: [
                'displayname',
                'name',
                'guild'
            ],
            limit: 8
        });
    }

    test(): Promise<any> {
        return this.runQuery({
            collection: 'character_misc',
            filter: [
                // { field: 'id', value: 438086903004 },
                // { field: 'quest_list.stage', value: 'The Crimson Ba', match: 'contains' }
            ],
            show: ['quest_list'],
            limit: 50
        });
    }

    async getLeyOfTheLandProgress(characters: Character[]): Promise<Character[]> {
        const miscs = await this.runQuery({
            collection: 'character_misc',
            filter: characters.map(c => ({ field: 'id', value: c.id })),
            show: [
                'completed_quest_list',
                'quest_list',
            ],
            limit: characters.length
        });

        return miscs.character_misc_list.map(misc => ({
            id: misc.id,
            name: characters.find(c => c.id === misc.id).name,
            weekly: getWeeklyStatus(misc, 3347608555),
            blinding: getQuestStatus(misc, 2233296293),
            aurelianCoast: getQuestStatus(misc, 471086111),
            sanctusSeru: getQuestStatus(misc, 1796408457),
            fordelMidst: getQuestStatus(misc, 4118253866),
            wracklands: getQuestStatus(misc, 2188419516),
            hallowedHalls: getQuestStatus(misc, 460976134),
            bolChallenge: getQuestStatus(misc, 1820246160),
            bindingToTheDark: getQuestStatus(misc, 2310147712)
        })).sort((a, b) => a.name.localeCompare(b.name));

        function getQuestStatus(misc: any, crc: number): QuestStatus {
            if (misc.completed_quest_list.map(q => q.crc).includes(crc)) {
                return { status: 'complete' };
            } else if (misc.quest_list.map(q => q.crc).includes(crc)) {
                return {
                    status: 'in-progress',
                    text: misc.quest_list.find(q => q.crc === crc).requiredItem_list.map(step => step.progress_text).join('\n')
                };
            } else {
                return { status: 'not-started' };
            }
        }

        function getWeeklyStatus(misc: any, crc: number): QuestStatus {
            if (misc.completed_quest_list.map(q => q.crc).includes(crc)) {
                return { status: 'complete' };
            } else if (misc.quest_list.map(q => q.crc).includes(crc)) {
                return {
                    status: 'in-progress',
                    text: misc.quest_list.find(q => q.crc === crc).requiredItem_list.map(step => `${step.progress}/${step.quota}`)[0]
                };
            } else {
                return { status: 'not-started' };
            }
        }
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
            show: ['stats', 'name', 'type'],
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
