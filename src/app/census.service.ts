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
        const data = await this.runQuery({
            collection: 'character',
            limit: characters.length,
            // filter: characters.map(c => ({ field: 'id', value: c.id })),
            filter: [{ field: 'id', value: characters.map(c => c.id).join(',') }],
            show: ['achievements.achievement_list', 'name.first'],
            resolve: [
                { field: 'achievements', show: ['event_list'] },
            ],
            join: [
                {
                    type: 'character_misc',
                    on: 'id',
                    to: 'id',
                    inject_at: 'misc',
                    show: ['completed_quest_list', 'quest_list', 'collection_list'],
                    nestedJoin: {
                        type: 'collection',
                        on: 'collection_list.crc',
                        to: 'id',
                        inject_at: 'reference',
                        show: ['reference_list']
                    }
                },
            ],
            tree: [
                { start: 'achievements.achievement_list', field: 'id' },
                { start: 'misc.collection_list', field: 'crc' },
                { start: 'misc.quest_list', field: 'crc' },
                { start: 'misc.completed_quest_list', field: 'crc' }
            ],
        });

        const characterStatus: Character[] = data.character_list.map(c => ({
            id: c.id,
            name: c.name.first,
            weekly: getWeeklyStatus(c, 3347608555),
            blinding: getQuestStatus(c, 2233296293),
            aurelianCoast: getQuestStatus(c, 471086111),
            sanctusSeru: getQuestStatus(c, 1796408457),
            fordelMidst: getQuestStatus(c, 4118253866),
            wracklands: getQuestStatus(c, 2188419516),
            hallowedHalls: getQuestStatus(c, 460976134),
            bolChallenge: getQuestStatus(c, 1820246160),
            // bindingToTheDark: getQuestStatus(c, 2310147712),
            answerTheCall: getAchievementStatus(c, 4101718547),
            volcanicThreats: getQuestStatus(c, 179143310),
            theFireWithin: getCollectionStatus(c, 2997731257),
            windingDescent: getQuestStatus(c, 384548791),
            indispensableComponents: getQuestStatus(c, 2414013965),
            // formulaForSuccess: getQuestStatus(c, 179143310),
        }) as Character);

        characterStatus.sort((a, b) => a.name.localeCompare(b.name));
        return characterStatus;

        function getQuestStatus(character: any, crc: number): QuestStatus {
            const completed = character.misc.completed_quest_list[crc];
            if (completed) {
                return { status: 'complete', text: new Date(completed.completion_date).toDateString() };
            }

            const active = character.misc.quest_list[crc];
            if (active) {
                return {
                    status: 'in-progress',
                    text: active.requiredItem_list.map(step => step.progress_text).join('\n')
                };
            }

            return { status: 'not-started' };
        }

        function getWeeklyStatus(character: any, crc: number): QuestStatus {
            const completed = character.misc.completed_quest_list[crc];
            if (completed) {
                return { status: 'complete', text: new Date(completed.completion_date).toDateString() };
            }

            const active = character.misc.quest_list[crc];
            if (active) {
                return {
                    status: 'in-progress',
                    text: active.requiredItem_list.map(step => `${step.progress}/${step.quota}`)[0]
                };
            }

            return { status: 'not-started' };
        }

        function getCollectionStatus(character: any, crc: number): QuestStatus {
            const collection = character.misc.collection_list[crc];
            if (collection) {
                if (collection.item_list.length === collection.reference.reference_list.length) {
                    return { status: 'complete' };
                }

                const completed = new Set<string>(collection.item_list.map(i => i.crc));
                const remaining = collection.reference.reference_list.filter(i => !completed.has(i.id)).map(i => i.name);

                return { status: 'in-progress', text: remaining.join('\n') };
            }

            return { status: 'not-started' };
        }

        function getAchievementStatus(character: any, id: number): QuestStatus {
            const achievement = character.achievements.achievement_list[id];
            if (achievement) {
                if (achievement.completed_timestamp) {
                    return { status: 'complete', text: new Date(achievement.completed_timestamp * 1000).toDateString() };
                }

                const remaining = achievement.event_list.filter(e => e.count === 0);
                return { status: 'in-progress', text: remaining.map(e => e.desc).join('\n') };
            }

            return { status: 'not-started' };
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
