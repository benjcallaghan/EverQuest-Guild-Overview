import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { build, CensusUrlOptions } from './daybreak-census-options';
import { QuestStatus } from './character';

export type CensusCharacter = {
  id: number;
  displayname: string;
  name: any;
  guild?: {
    guildid: number;
    id: number;
    joined: number;
    level: number;
    name: string;
    rank: number;
    status: number;
  };
};

export type CharacterSearchResults = {
  character_list: CensusCharacter[];
};

export type RosFlawlessCharacter = {
  id: number;
  name: string;
  creator: QuestStatus;
  kaasThoxXiAtenHaRa: QuestStatus;
  zzz: QuestStatus;
  betrayer4: QuestStatus;
  betrayer3: QuestStatus;
  betrayer2: QuestStatus;
  betrayer1: QuestStatus;
  xakra: QuestStatus;
  vaDynKhar: QuestStatus;
  greta: QuestStatus;
  beastFromBeyond: QuestStatus;
  grimlock: QuestStatus;
  colossus: QuestStatus;
  diabo: QuestStatus;
  thallXundraxDiabo: QuestStatus;
  thallVaXakraFer: QuestStatus;
  akhessaVaLiakoVess: QuestStatus;
  verrkara: QuestStatus;
  emperor: QuestStatus;
  nelonHes: QuestStatus;
  hoggith: QuestStatus;
  fenirekTal: QuestStatus;
  khatiSha: QuestStatus;
  burrowerBeast: QuestStatus;
  lhurzz: QuestStatus;
  jerrek: QuestStatus;
  grieg: QuestStatus;
};

export type RosCharacter = {
  id: number;
  name: string;
  echoCaverns: QuestStatus;
  shadeweaversThicket: QuestStatus;
  vexThal: QuestStatus;
};

export type SolEyeCharacter = {
  id: number;
  name: string;
  answerTheCall: QuestStatus;
  volcanicThreats: QuestStatus;
  theFireWithin: QuestStatus;
  windingDescent: QuestStatus;
  indispensableComponents: QuestStatus;
  formulaForSuccess: QuestStatus;
};

export type BolCharacter = {
  id: number;
  name: string;
  blinding: QuestStatus;
  aurelianCoast: QuestStatus;
  sanctusSeru: QuestStatus;
  fordelMidst: QuestStatus;
  wracklands: QuestStatus;
  hallowedHalls: QuestStatus;
  bolChallenge: QuestStatus;
};

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

  public getCharactersByName(
    name: string,
    serverId?: number
  ): Promise<CharacterSearchResults> {
    return this.runQuery({
      collection: 'character',
      filter: [
        {
          field: 'name.first_lower',
          value: name.toLowerCase(),
          match: 'startsWith',
        },
        ...(serverId
          ? [
              {
                field: 'locationdata.worldid',
                value: `${serverId}`,
              },
            ]
          : []),
      ],
      exactMatchFirst: true,
      sort: [{ field: 'displayname' }],
      show: ['displayname', 'name', 'guild'],
      limit: 8,
    });
  }

  public async getReignOfShadowsFlawlessQuests(
    characterIds: number[]
  ): Promise<RosFlawlessCharacter[]> {
    const data = await this.runQuery({
      collection: 'character',
      limit: characterIds.length,
      filter: [{ field: 'id', value: characterIds.join(',') }],
      tree: [{ start: 'achievements.achievement_list', field: 'id' }],
      show: ['name.first', 'achievements.achievement_list'],
    });

    const characterStatus: RosFlawlessCharacter[] = data.character_list.map((c) => ({
      id: c.id,
      name: c.name.first,
      creator: this.getAchievementStatus(c, 233108436),
      kaasThoxXiAtenHaRa: this.getAchievementStatus(c, 2707319114),
      zzz: this.getAchievementStatus(c, 2450032467),
      betrayer4: this.getAchievementStatus(c, 235217895),
      betrayer3: this.getAchievementStatus(c, 230067965),
      betrayer2: this.getAchievementStatus(c, 3037391256),
      betrayer1: this.getAchievementStatus(c, 2814330486),
      xakra: this.getAchievementStatus(c, 1914889172),
      vaDynKhar: this.getAchievementStatus(c, 3373501509),
      greta: this.getAchievementStatus(c, 760470014),
      beastFromBeyond: this.getAchievementStatus(c, 517383268),
      grimlock: this.getAchievementStatus(c, 1384602904),
      colossus: this.getAchievementStatus(c, 1251582723),
      diabo: this.getAchievementStatus(c, 3188430906),
      thallXundraxDiabo: this.getAchievementStatus(c, 1606158253),
      thallVaXakraFer: this.getAchievementStatus(c, 3948433922),
      akhessaVaLiakoVess: this.getAchievementStatus(c, 1732565854),
      verrkara: this.getAchievementStatus(c, 2042129110),
      emperor: this.getAchievementStatus(c, 2098276653),
      nelonHes: this.getAchievementStatus(c, 1348749755),
      hoggith: this.getAchievementStatus(c, 2253932959),
      fenirekTal: this.getAchievementStatus(c, 1319033136),
      khatiSha: this.getAchievementStatus(c, 745459971),
      burrowerBeast: this.getAchievementStatus(c, 983088361),
      lhurzz: this.getAchievementStatus(c, 1781623804),
      jerrek: this.getAchievementStatus(c, 3548829345),
      grieg: this.getAchievementStatus(c, 3061320400),
    }));

    characterStatus.sort((a, b) => a.name.localeCompare(b.name));
    return characterStatus;
  }

  public async getReignOfShadowsQuests(
    characterIds: number[]
  ): Promise<RosCharacter[]> {
    const data = await this.runQuery({
      collection: 'character',
      limit: characterIds.length,
      filter: [{ field: 'id', value: characterIds.join(',') }],
      join: [
        {
          type: 'character_misc',
          on: 'id',
          to: 'id',
          inject_at: 'misc',
          show: ['completed_quest_list', 'quest_list'],
        },
      ],
      tree: [
        { start: 'misc.quest_list', field: 'crc' },
        { start: 'misc.completed_quest_list', field: 'crc' },
      ],
      show: ['name.first'],
    });

    const characterStatus: RosCharacter[] = data.character_list.map((c) => ({
      id: c.id,
      name: c.name.first,
      echoCaverns: this.getQuestStatus(c, 1004769891),
      shadeweaversThicket: this.getQuestStatus(c, 2733294553),
      vexThal: this.getQuestStatus(c, 3589141327),
    }));

    characterStatus.sort((a, b) => a.name.localeCompare(b.name));
    return characterStatus;
  }

  public async getSoluseksEyeQuests(
    characterIds: number[]
  ): Promise<SolEyeCharacter[]> {
    const data = await this.runQuery({
      collection: 'character',
      limit: characterIds.length,
      filter: [{ field: 'id', value: characterIds.join(',') }],
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
        { start: 'misc.quest_list', field: 'crc' },
        { start: 'misc.collection_list', field: 'crc' },
        { start: 'misc.completed_quest_list', field: 'crc' },
        { start: 'achievements.achievement_list', field: 'id' },
      ],
      show: ['name.first', 'achievements.achievement_list'],
    });

    const characterStatus: SolEyeCharacter[] = data.character_list.map((c) => ({
      id: c.id,
      name: c.name.first,
      answerTheCall: this.getAchievementStatus(c, 4101718547),
      volcanicThreats: this.getQuestStatus(c, 179143310),
      theFireWithin: this.getCollectionStatus(c, 2997731257),
      windingDescent: this.getQuestStatus(c, 384548791),
      indispensableComponents: this.getQuestStatus(c, 2414013965),
      formulaForSuccess: this.getQuestStatus(c, 4175814299),
    }));

    characterStatus.sort((a, b) => a.name.localeCompare(b.name));
    return characterStatus;
  }

  public async getBloodOfLuclinQuests(
    characterIds: number[]
  ): Promise<BolCharacter[]> {
    const data = await this.runQuery({
      collection: 'character',
      limit: characterIds.length,
      filter: [{ field: 'id', value: characterIds.join(',') }],
      join: [
        {
          type: 'character_misc',
          on: 'id',
          to: 'id',
          inject_at: 'misc',
          show: ['completed_quest_list', 'quest_list'],
        },
      ],
      tree: [
        { start: 'misc.quest_list', field: 'crc' },
        { start: 'misc.completed_quest_list', field: 'crc' },
      ],
      show: ['name.first'],
    });

    const characterStatus: BolCharacter[] = data.character_list.map((c) => ({
      id: c.id,
      name: c.name.first,
      blinding: this.getQuestStatus(c, 2233296293),
      aurelianCoast: this.getQuestStatus(c, 471086111),
      sanctusSeru: this.getQuestStatus(c, 1796408457),
      fordelMidst: this.getQuestStatus(c, 4118253866),
      wracklands: this.getQuestStatus(c, 2188419516),
      hallowedHalls: this.getQuestStatus(c, 460976134),
      bolChallenge: this.getQuestStatus(c, 1820246160),
    }));

    characterStatus.sort((a, b) => a.name.localeCompare(b.name));
    return characterStatus;
  }

  public getCharactersWithAchievements(characters: any[]): Promise<any> {
    return this.runQuery({
      collection: 'character',
      limit: characters.length,
      filter: [{ field: 'id', value: characters.map((c) => c.id).join(',') }],
      show: ['achievements.achievement_list', 'name.first'],
      // resolve: [{ field: 'achievements', show: ['event_list'] }],
      // The consumers do not require achievement details, just achievement completion.
      // This is already available in the basic character data.
      tree: [{ start: 'achievements.achievement_list', field: 'id' }],
    });
  }

  private runQuery(options: Partial<CensusUrlOptions>): Promise<any> {
    const url = build({
      ...this.defaultOptions,
      ...options,
    });
    return this.http.get(url.href).toPromise();
  }

  private getQuestStatus(character: any, crc: number): QuestStatus {
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

  private getAchievementStatus(character: any, id: number): QuestStatus {
    const achievement = character.achievements.achievement_list[id];
    if (achievement) {
      if (achievement.completed_timestamp) {
        return {
          status: 'complete',
          text: new Date(achievement.completed_timestamp * 1000).toDateString(),
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

  private getCollectionStatus(character: any, crc: number): QuestStatus {
    const collection = character.misc.collection_list[crc];
    if (collection) {
      if (
        collection.item_list.length ===
        collection.reference.reference_list.length
      ) {
        return { status: 'complete' };
      }

      const completed = new Set<string>(collection.item_list.map((i) => i.crc));
      const remaining = collection.reference.reference_list
        .filter((i) => !completed.has(i.id))
        .map((i) => i.name);

      return { status: 'in-progress', text: remaining.join('\n') };
    }

    return { status: 'not-started' };
  }
}
