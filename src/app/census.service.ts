import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { build, CensusUrlOptions } from './daybreak-census-options';
import { Character, QuestStatus } from './character';

@Injectable({
  providedIn: 'root',
})
export class CensusService {
  private defaultOptions: CensusUrlOptions = {
    serviceId: 's:benjadorncalculator',
    format: 'json',
    verb: 'get',
    namespace: 'eq2',
  };

  constructor(private http: HttpClient) {}

  public getCharacterByName(name: string): Promise<any> {
    return this.runQuery({
      collection: 'character',
      filter: [
        {
          field: 'name.first_lower',
          value: name.toLowerCase(),
          match: 'startsWith',
        },
      ],
      exactMatchFirst: true,
      sort: [{ field: 'displayname' }],
      show: ['displayname', 'name', 'guild'],
      limit: 8,
    });
  }

  public async getReignOfShadowsRankings(): Promise<any[]> {
    const rosRaids = [
      // Echo Caverns
      2270131434, // The Ancient Burrower Beast (Tier 1)
      915224777, // Lhurzz (Tier 1)
      1578027977, // Jerrek Amaw'Rosis (Tier 2)
      2775203849, // Grieg Veneficus (Tier 3)

      // Spiritweaver's Thicket
      3398946219, // Nelon Hes (Tier 1)
      4001261287, // The Eternal Cinder (Tier 1)
      1187803900, // Fehdu, Rehdu, and Pehdu (Tier 2)
      3622982097, // The Ancient Spirit (Tier 3)

      // Vex Thal
      1446166111, // Va Dyn Khar (Tier 3)
      3975437458, // Xakra Fu'un (Tier 3)
      949908588, // Betrayer I (Tier 3)
      707517314, // Betrayer II (Tier 3)
      2459417831, // Betrayer III (Tier 3)
      2435060221, // Betrayer IV (Tier 4)
      326405197, // Monstrous Shadows (Tier 4)
      1209463812, // Zun Liako Ferun, Zun Diabo Xiun, and Zun Thall Heral (Tier 4)
      823313119, // The Creator (Tier 5)

      // Savage Weald
      2743413289, // The Grimling Hero (Tier 5)
    ];

    const { guild_list: guilds } = await this.runQuery({
      collection: 'guild',
      tree: [{ field: 'id', start: 'achievement_list' }],
      filter: [{ field: 'achievement_list.id', value: 2270131434 }],
      show: ['name', 'achievement_list', 'world'],
      limit: 50,
    });

    return (guilds as any[]).sort((a, b) => {
      const killDifference = getKillCount(b) - getKillCount(a);
      if (killDifference !== 0) {
        return killDifference;
      }

      const lastKill = getLastKill(a);
      return (
        a.achievement_list[lastKill].completedtimestamp -
        b.achievement_list[lastKill].completedtimestamp
      );
    });

    function getKillCount(guild): number {
      return Object.keys(guild.achievement_list).reduce<number>(
        (sum, achievementId) =>
          sum + (rosRaids.includes(+achievementId) ? 1 : 0),
        0
      );
    }

    function getLastKill(guild): number {
      for (let i = rosRaids.length - 1; i >= 0; i--) {
        const id = rosRaids[i];
        if (guild.achievement_list[id]) {
          return id;
        }
      }
      return 0;
    }
  }

  public async getQuests(characters: Character[]): Promise<Character[]> {
    const data = await this.runQuery({
      collection: 'character',
      limit: characters.length,
      filter: [{ field: 'id', value: characters.map((c) => c.id).join(',') }],
      show: ['achievements.achievement_list', 'name.first'],
      resolve: [{ field: 'achievements', show: ['event_list'] }],
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
            show: ['reference_list'],
          },
        },
      ],
      tree: [
        { start: 'achievements.achievement_list', field: 'id' },
        { start: 'misc.collection_list', field: 'crc' },
        { start: 'misc.quest_list', field: 'crc' },
        { start: 'misc.completed_quest_list', field: 'crc' },
      ],
    });

    const characterStatus: Character[] = data.character_list.map(
      (c) =>
        ({
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
          formulaForSuccess: getQuestStatus(c, 4175814299),
        } as Character)
    );

    characterStatus.sort((a, b) => a.name.localeCompare(b.name));
    return characterStatus;

    function getQuestStatus(character: any, crc: number): QuestStatus {
      const completed = character.misc.completed_quest_list[crc];
      if (completed) {
        return {
          status: 'complete',
          text: new Date(completed.completion_date).toDateString(),
        };
      }

      const active = character.misc.quest_list[crc];
      if (active) {
        return {
          status: 'in-progress',
          text: active.requiredItem_list
            .map((step) => step.progress_text)
            .join('\n'),
        };
      }

      return { status: 'not-started' };
    }

    function getWeeklyStatus(character: any, crc: number): QuestStatus {
      const completed = character.misc.completed_quest_list[crc];
      if (completed) {
        return {
          status: 'complete',
          text: new Date(completed.completion_date).toDateString(),
        };
      }

      const active = character.misc.quest_list[crc];
      if (active) {
        return {
          status: 'in-progress',
          text: active.requiredItem_list.map(
            (step) => `${step.progress}/${step.quota}`
          )[0],
        };
      }

      return { status: 'not-started' };
    }

    function getCollectionStatus(character: any, crc: number): QuestStatus {
      const collection = character.misc.collection_list[crc];
      if (collection) {
        if (
          collection.item_list.length ===
          collection.reference.reference_list.length
        ) {
          return { status: 'complete' };
        }

        const completed = new Set<string>(
          collection.item_list.map((i) => i.crc)
        );
        const remaining = collection.reference.reference_list
          .filter((i) => !completed.has(i.id))
          .map((i) => i.name);

        return { status: 'in-progress', text: remaining.join('\n') };
      }

      return { status: 'not-started' };
    }

    function getAchievementStatus(character: any, id: number): QuestStatus {
      const achievement = character.achievements.achievement_list[id];
      if (achievement) {
        if (achievement.completed_timestamp) {
          return {
            status: 'complete',
            text: new Date(
              achievement.completed_timestamp * 1000
            ).toDateString(),
          };
        }

        const remaining = achievement.event_list.filter((e) => e.count === 0);
        return {
          status: 'in-progress',
          text: remaining.map((e) => e.desc).join('\n'),
        };
      }

      return { status: 'not-started' };
    }
  }

  public getCharactersWithAchievements(characters: any[]): Promise<any> {
    return this.runQuery({
      collection: 'character',
      limit: characters.length,
      filter: [{ field: 'id', value: characters.map((c) => c.id).join(',') }],
      show: ['achievements.achievement_list', 'name.first'],
      resolve: [{ field: 'achievements', show: ['event_list'] }],
      tree: [
        { start: 'achievements.achievement_list', field: 'id' },
      ],
    });
  }

  private runQuery(options: Partial<CensusUrlOptions>): Promise<any> {
    const url = build({
      ...this.defaultOptions,
      ...options,
    });
    return this.http.get(url.href).toPromise();
  }
}
