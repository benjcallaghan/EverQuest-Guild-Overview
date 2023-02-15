import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { build, CensusUrlOptions, Join, Tree } from './daybreak-census-options';

export interface QuestStatus {
  text?: string;
  status: 'in-progress' | 'complete' | 'not-started' | 'unknown';
}

export interface CensusCharacter {
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
}

export interface AdornCalculatorViewModel {
  character: CharacterWithAdorns;
  allAdorns: Record<string, string[]>;
}

export interface CharacterWithAdorns {
  equipmentslot_list: Array<{
    displayname: string;
    item: {
      adornment_list: Record<string, string[]>;
      id: number;
      details: {
        displayname: string;
      };
    };
  }>;
  type: {
    level: number;
    class: string;
  };
}

interface Item {
  displayname: string;
  typeinfo: {
    color: string;
  };
}

interface CharacterSearchResults<T> {
  character_list: T[];
}

interface ItemSearchResults<T> {
  item_list: T[];
}

export type QuestQuery = {
  [key: string]: { type: 'achievement' | 'quest' | 'collection'; id: number };
};

export type QuestResults<Query extends QuestQuery> = ({
  id: number;
  name: string;
} & {
  [key in keyof Query]: QuestStatus;
})[];

@Injectable({
  providedIn: 'root',
})
export class CensusService {
  private defaultOptions: CensusUrlOptions = {
    serviceId: 's:vexedencetracker',
    format: 'json',
    verb: 'get',
    namespace: 'eq2',
  };

  constructor(private http: HttpClient) {}

  public getCharactersByName(
    name: string,
    serverId?: number
  ): Observable<CharacterSearchResults<CensusCharacter>> {
    return this.runQuery<CharacterSearchResults<CensusCharacter>>({
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

  public getCharacterWithAdorns(
    name: string,
    serverId: number
  ): Observable<CharacterWithAdorns> {
    return this.runQuery<CharacterSearchResults<CharacterWithAdorns>>({
      collection: 'character',
      filter: [
        {
          field: 'name.first_lower',
          value: name.toLowerCase(),
        },
        {
          field: 'locationdata.worldid',
          value: `${serverId}`,
        },
      ],
      exactMatchFirst: true,
      sort: [{ field: 'displayname' }],
      join: [
        {
          type: 'item',
          on: 'equipmentslot_list.item.id',
          to: 'id',
          inject_at: 'details',
          show: ['displayname'],
        },
        {
          type: 'item',
          on: 'equipmentslot_list.item.adornment_list.id',
          to: 'id',
          inject_at: 'details',
          show: ['displayname'],
        },
      ],
      limit: 1,
      show: ['equipmentslot_list', 'type'],
    }).pipe(
      map((data) => data.character_list[0]),
      // switchMap((character) =>
      //   this.runQuery<ItemSearchResults<Item>>({
      //     collection: 'item',
      //     filter: [
      //       {
      //         field: 'typeinfo.name',
      //         value: 'adornment',
      //       },
      //       {
      //         field: `typeinfo.classes.${character.type.class.toLowerCase()}.level`,
      //         value: character.type.level,
      //         match: 'lessThanOrEqual',
      //       },
      //       {
      //         field: 'typeinfo.color',
      //         value: 'temporary',
      //         match: 'notEqual',
      //       },
      //     ],
      //     limit: 100,
      //   }).pipe(map((rawAdorns) => ({ character, rawAdorns })))
      // ),
      map((character) => {
        character.equipmentslot_list = character.equipmentslot_list.filter(
          (slot) =>
            slot.displayname !== 'Ammo' &&
            slot.displayname !== 'Food' &&
            slot.displayname !== 'Drink' &&
            slot.displayname !== 'Mount Adornment' &&
            slot.displayname !== 'Mount Armor'
        );
        // Couldn't figure out the tree query for this one, so I'm handling it "in post".
        character.equipmentslot_list = character.equipmentslot_list.map(
          (slot) => {
            const adorns: Record<string, string[]> = {};
            for (const adorn of slot.item.adornment_list as any) {
              adorns[adorn.color] ??= [];
              adorns[adorn.color].push(adorn.details?.displayname);
            }
            slot.item.adornment_list = adorns;
            return slot;
          }
        );

        // const allAdorns: Record<string, string[]> = {};
        // for (const adorn of rawAdorns.item_list) {
        //   allAdorns[adorn.typeinfo.color] ??= [];
        //   allAdorns[adorn.typeinfo.color].push(adorn.displayname);
        // }

        return character;
      })
    );
  }

  public queryQuestStatus<Query extends QuestQuery>(
    characterIds: number[],
    query: Query
  ): Observable<QuestResults<Query>> {
    const hasQuests = Object.values(query).some(({ type }) => type === 'quest');
    const hasAchievements = Object.values(query).some(
      ({ type }) => type === 'achievement'
    );
    const hasCollections = Object.values(query).some(
      ({ type }) => type === 'collection'
    );

    return this.runQuery<any>({
      collection: 'character',
      limit: characterIds.length,
      filter: [{ field: 'id', value: characterIds.join(',') }],
      join: [
        ...(hasQuests || hasCollections
          ? ([
              {
                type: 'character_misc',
                on: 'id',
                to: 'id',
                inject_at: 'misc',
                show: [
                  ...(hasQuests ? ['completed_quest_list', 'quest_list'] : []),
                  ...(hasCollections ? ['collection_list'] : []),
                ],
                nestedJoin: hasCollections
                  ? {
                      type: 'collection',
                      on: 'collection_list.crc',
                      to: 'id',
                      inject_at: 'reference',
                      show: ['reference_list'],
                    }
                  : undefined,
              },
            ] as Join[])
          : []),
      ],
      tree: [
        ...(hasAchievements
          ? ([
              { start: 'achievements.achievement_list', field: 'id' },
            ] as Tree[])
          : []),
        ...(hasQuests
          ? ([
              { start: 'misc.quest_list', field: 'crc' },
              { start: 'misc.completed_quest_list', field: 'crc' },
            ] as Tree[])
          : []),
        ...(hasCollections
          ? ([{ start: 'misc.collection_list', field: 'crc' }] as Tree[])
          : []),
      ],
      show: [
        'name.first',
        ...(hasAchievements ? ['achievements.achievement_list'] : []),
      ],
    }).pipe(
      map((data) => {
        const characters = data.character_list.map((c) => {
          const result = { id: c.id, name: c.name.first };

          for (const [key, { type, id }] of Object.entries(query)) {
            result[key] =
              type === 'achievement'
                ? this.getAchievementStatus(c, id)
                : type === 'quest'
                ? this.getQuestStatus(c, id)
                : type === 'collection'
                ? this.getCollectionStatus(c, id)
                : undefined;
          }

          return result;
        });

        characters.sort((a, b) => a.name.localeCompare(b.name));
        return characters;
      })
    );
  }

  private runQuery<T>(options: Partial<CensusUrlOptions>): Observable<T> {
    const url = build({
      ...this.defaultOptions,
      ...options,
    });
    return this.http.get<T>(url.href);
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
