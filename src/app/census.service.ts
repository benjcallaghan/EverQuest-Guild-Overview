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
        format: 'json',
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

    async getQuests(characters: Character[]): Promise<Character[]> {
        const miscs = await this.runQuery({
            collection: 'character_misc',
            filter: characters.map(c => ({ field: 'id', value: c.id })),
            show: [
                'completed_quest_list',
                'quest_list',
                'collection_list'
            ],
            limit: characters.length
        });

        const collectionResults = await this.runQuery({
            collection: 'collection',
            identifier: '2997731257'
        });
        const fireWithin = collectionResults.collection_list[0];

        const charactersWithQuests: Character[] = miscs.character_misc_list.map(misc => ({
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
            // bindingToTheDark: getQuestStatus(misc, 2310147712),
            volcanicThreats: getQuestStatus(misc, 179143310),
            theFireWithin: getCollectionStatus(misc, 2997731257, fireWithin),
            windingDescent: getQuestStatus(misc, 384548791),
            indispensableComponents: getQuestStatus(misc, 2414013965),
            // formulaForSuccess: getQuestStatus(misc, 179143310),
        })).sort((a, b) => a.name.localeCompare(b.name));

        const censusCharacters = await this.runQuery({
            collection: 'character',
            filter: characters.map(c => ({ field: 'id', value: c.id })),
            show: [
                'achievements'
            ],
            limit: characters.length
        });

        const achievementResults = await this.runQuery({
            collection: 'achievement',
            identifier: '4101718547'
        });
        const answerTheCall = achievementResults.achievement_list[0];

        for (const character of charactersWithQuests) {
            const censusCharacter = censusCharacters.character_list.find(c => c.id === character.id);
            character.answerTheCall = getAchievementStatus(censusCharacter, 4101718547, answerTheCall);
        }

        return charactersWithQuests;

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

        function getCollectionStatus(misc: any, crc: number, collection: any): QuestStatus {
            if (misc.collection_list.map(q => q.crc).includes(crc)) {
                const completedItems = misc.collection_list.find(q => q.crc === crc);

                const set = new Set<string>();
                for (const id of completedItems.item_list.map(q => q.crc)) {
                    set.add(id);
                }

                const remaining = collection.reference_list.filter(i => !set.has(i.id)).map(i => i.name);
                if (remaining.length) {
                    return { status: 'in-progress', text: remaining.join('\n') };
                } else {
                    return { status: 'complete' };
                }
            } else {
                return { status: 'not-started' };
            }
        }

        function getAchievementStatus(character: any, id: number, achievement: any): QuestStatus {
            const active = character.achievements.achievement_list.find(a => a.id === id);
            if (active) {
                if (active.completed_timestamp) {
                    return { status: 'complete' };
                } else {
                    const remaining = [];
                    for (let i = 0; i < active.event_list.length; i++) {
                        if (active.event_list[i].count === 0) {
                            remaining.push(achievement.event_list[i].desc);
                        }
                    }
                    return { status: 'in-progress', text: remaining.join('\n') };
                }
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
            tree: [{
                field: 'id',
                start: 'achievements.achievement_list'
            }],
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
