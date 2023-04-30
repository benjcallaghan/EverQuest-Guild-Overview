import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImmerComponentStore } from 'ngrx-immer/component-store';
import { from, Observable, pipe } from 'rxjs';
import { exhaustMap, map, mergeMap, tap, toArray } from 'rxjs/operators';
import { build } from '../daybreak-census-options';

interface EquippedAdornment {
  color: string;
  percenttonextlevel?: number;
  spiritlevel?: number;
  id?: number;
  details?: Item;
}

interface CharacterSearchResults {
  character_list: Character[];
}

interface Character {
  displayname: string;
  id: number;
  equipmentslot_list: Array<{
    item: {
      setbonus_list: unknown[];
      modifiers: unknown;
      growth_table?: unknown;
      id: number;
      adornment_list: Array<EquippedAdornment>;
      details?: {
        displayname: string;
      };
    };
    displayname: string;
    id: number;
    name: string;
  }>;
  type: {
    level: number;
    class: string;
  };
}

interface ItemSearchResults {
  item_list: Item[];
}

interface Item {
  typeinfo: {
    name: string;
    color: string;
    slot_list: Array<{
      displayname: string;
      id: number;
      name: string;
    }>;
    placementflag_list: unknown[];
    classes: unknown;
    duration?: number;
  };
  displayname: string;
  modifiers?: Record<
    string,
    { displayname: string; type: string; value: number }
  >;
}

export interface AdornmentOption {
  displayName: string;
  description: string;
}

export interface AdornmentsState {
  searching: boolean;
  character?: Character;
  allAdornments?: Item[];
  selectedAdornments: Record<string, Record<string, Record<number, string>>>;
  newAdornments: Record<string, number>;
}

@Injectable()
export class AdornmentsStore extends ImmerComponentStore<AdornmentsState> {
  constructor(private http: HttpClient) {
    super({ searching: false, selectedAdornments: {}, newAdornments: {} });
    this.loadRenewalAdorns();
  }

  public searching$ = this.select((state) => state.searching);
  public character$ = this.select((state) => state.character);
  public allAdornments$ = this.select((state) => state.allAdornments);
  public selectedAdornments$ = this.select((state) => state.selectedAdornments);
  public newAdornments$ = this.select((state) => state.newAdornments);

  public colors$ = this.select(this.character$, (character) =>
    unique(
      character.equipmentslot_list
        .flatMap((slot) => slot.item.adornment_list)
        .map((adorn) => adorn.color)
        .filter((color) => color !== 'temporary')
    )
  );
  public equippedAdornments$ = this.select(this.character$, (character) => {
    const adornmentSlots: Record<
      string,
      Record<string, AdornmentOption[]>
    > = {};

    if (!character) {
      return adornmentSlots;
    }

    for (const equipmentSlot of character.equipmentslot_list) {
      for (const adorn of equipmentSlot.item.adornment_list) {
        adornmentSlots[equipmentSlot.name] ??= {};
        adornmentSlots[equipmentSlot.name][adorn.color] ??= [];
        adornmentSlots[equipmentSlot.name][adorn.color].push({
          description: getDescription(adorn.details),
          displayName: adorn.details?.displayname,
        });
      }
    }

    return adornmentSlots;
  });
  public organizedAdornments$ = this.select(
    this.allAdornments$,
    (allAdorns) => {
      const sortedAdornments = sortAdornments(allAdorns);
      const adornmentSlots: Record<
        string,
        Record<string, AdornmentOption[]>
      > = {};

      for (const adorn of sortedAdornments) {
        for (const slot of adorn.typeinfo.slot_list) {
          adornmentSlots[slot.name] ??= {};
          adornmentSlots[slot.name][adorn.typeinfo.color] ??= [];
          adornmentSlots[slot.name][adorn.typeinfo.color].push({
            description: getDescription(adorn),
            displayName: adorn.displayname,
          });
        }
      }

      return adornmentSlots;
    }
  );
  public newAdornmentsSummary$ = this.select(
    this.newAdornments$,
    (newAdornments) => {
      return Object.entries(newAdornments).map(
        ([name, count]) => `${count} - ${name}`
      );
    }
  );

  public updateSlot = this.updater(
    (
      state,
      [slot, color, index, adornName]: [string, string, number, string]
    ) => {
      const oldAdorn = state.selectedAdornments[slot]?.[color]?.[index];

      if (oldAdorn) {
        state.newAdornments[oldAdorn]--;
        if (state.newAdornments[oldAdorn] === 0) {
          delete state.newAdornments[oldAdorn];
        }
      }
      if (adornName) {
        state.newAdornments[adornName] ??= 0;
        state.newAdornments[adornName]++;
      }

      state.selectedAdornments[slot] ??= {};
      state.selectedAdornments[slot][color] ??= {};
      state.selectedAdornments[slot][color][index] = adornName;
    }
  );

  public searchForCharacter = this.effect<[string, number]>(
    pipe(
      tap(() => this.patchState({ searching: true })),
      exhaustMap(([name, server]) =>
        this.http.get<CharacterSearchResults>(
          build({
            serviceId: 's:vexedencetracker',
            format: 'json',
            verb: 'get',
            namespace: 'eq2',
            collection: 'character',
            filter: [
              {
                field: 'name.first_lower',
                value: name.toLowerCase(),
              },
              {
                field: 'locationdata.worldid',
                value: `${server}`,
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
                show: ['displayname', 'modifiers'],
              },
            ],
            limit: 1,
            show: ['equipmentslot_list', 'type'],
          }).href
        )
      ),
      map((results) => results.character_list[0]),
      tap((character: Character) => {
        character.equipmentslot_list = character.equipmentslot_list.filter(
          (slot) =>
            slot.displayname !== 'Ammo' &&
            slot.displayname !== 'Food' &&
            slot.displayname !== 'Drink' &&
            slot.displayname !== 'Mount Adornment' &&
            slot.displayname !== 'Mount Armor'
        );

        this.patchState({
          searching: false,
          character,
        });
      })
    )
  );

  public loadRenewalAdorns = this.effect<void>(
    pipe(
      exhaustMap(() =>
        from([
          'forlorn', // VoV Handcrafted
          'dreadfell', // VoV Mastercrafted
          'true blood', // VoV Mastercrafted Fabled
          'plateaus', // RoR Handcrafted
          'hizite', // RoR Mastercrafted
          'delta', // RoR Mastercrafted Fabled (Tradeskill)
          'badlands', // RoR Mastercrafted Fabled
          'hua collector', // VoV->RoR Panda
          // RoR Lockbox Gear
          'Abysmal Sea Rune: Anguish',
          'Abysmal Sea Rune: Arcane Rending',
          'Abysmal Sea Rune: Aura of Stamina',
          'Abysmal Sea Rune: Devastation Strike',
          'Abysmal Sea Rune: Elemental Rending',
          'Abysmal Sea Rune: Embers',
          'Abysmal Sea Rune: Insight',
          'Abysmal Sea Rune: Mystery',
          'Abysmal Sea Rune: Noxious Rending',
          'Bloodbound Rune: Blissful Thought',
          'Bloodbound Rune: Force Projection',
          "Bloodbound Rune: Infusion of Qua'ddathul",
          'Bloodbound Rune: Resurgence',
          'Bloodbound Rune: Timed Attacks',
          'Ensorcelled Dreadfell Adornment of Increased Criticals',
          'Ensorcelled Dreadfell Rune of Zeal',
          'Forlorn Rune: Chorus of Night',
          'Forlorn Rune: Symphony of the Void',
          "Hua Collector's Cometglow",
          "Hua Collector's Star Shard",
          'Rune of Bloodbound Torment',
          'Enscorcelled Dreadfell Adornment of Health',
          'Ensorcelled Dreadfell Adornment of Extra Attacks',
          'Ensorcelled Dreadfell Adornment of Health',
          'Ensorcelled Dreadfell Adornment of Increased Criticals',
          'Ensorcelled Dreadfell Adornment of Modified Power',
          'Ensorcelled Dreadfell Adornment of Raw Power',
        ]).pipe(
          map((adornPattern) => adornPattern.toLowerCase()),
          mergeMap((adornPattern) => this.getAdorns(adornPattern)),
          map((searchResult) => searchResult.item_list),
          toArray()
        )
      ),
      map((allResults) => allResults.flat()),
      map((allAdorns) => uniqueByKey(allAdorns, (adorn) => adorn.displayname)),
      tap((allAdornments: Item[]) => {
        this.patchState({
          allAdornments,
        });
      })
    )
  );

  private getAdorns(name: string): Observable<ItemSearchResults> {
    return this.http.get<ItemSearchResults>(
      build({
        serviceId: 's:vexedencetracker',
        format: 'json',
        verb: 'get',
        namespace: 'eq2',
        collection: 'item',
        filter: [
          {
            field: 'typeinfo.name',
            value: 'adornment',
          },
          {
            field: 'displayname_lower',
            value: name,
            match: 'contains',
          },
          {
            field: 'typeinfo.color',
            value: 'temporary',
            match: 'notEqual',
          },
        ],
        show: ['displayname', 'typeinfo', 'modifiers'],
        limit: 100,
      }).href
    );
  }

  public equippedAdorn = (slot: string, color: string) =>
    this.select(
      this.equippedAdornments$,
      (allAdorns) => allAdorns[slot][color]
    );

  public availableAdorns = (slot: string, color: string) => {
    let normalizedSlot = slot;

    switch (slot) {
      case 'right_ring':
        normalizedSlot = 'left_ring';
        break;
      case 'ears2':
        normalizedSlot = 'ears';
        break;
      case 'right_wrist':
        normalizedSlot = 'left_wrist';
        break;
      case 'activate2':
        normalizedSlot = 'activate1';
        break;
    }

    return this.select(
      this.organizedAdornments$,
      (adorns) => adorns[normalizedSlot][color]
    );
  };
}

function unique<T>(arr: T[]): T[] {
  return arr.filter((_, i) => arr.indexOf(arr[i]) === i);
}

function uniqueByKey<Element, Key>(
  arr: Element[],
  keySelector: (item: Element) => Key
): Element[] {
  const vArr = arr.map(keySelector);
  return arr.filter((_, i) => vArr.indexOf(vArr[i]) === i);
}

function sortAdornments(adornments: Item[]): Item[] {
  const sorted = [...adornments];
  sorted.sort((a, b) => {
    const aModifierSet = Object.keys(a.modifiers).sort();
    const bModifierSet = Object.keys(b.modifiers).sort();
    const modifierSetCompare = JSON.stringify(aModifierSet).localeCompare(
      JSON.stringify(bModifierSet)
    );
    if (modifierSetCompare !== 0) {
      return modifierSetCompare;
    }
    for (const modifierName of aModifierSet) {
      const aModifierValue = a.modifiers[modifierName].value;
      const bModifierValue = b.modifiers[modifierName].value;
      if (aModifierValue !== bModifierValue) {
        return aModifierValue - bModifierValue;
      }
    }
    return 0;
  });
  return sorted;
}

function getDescription(adornment: Item | undefined): string {
  if (adornment?.modifiers) {
    const modifiers = Object.values(adornment?.modifiers);
    if (modifiers.length) {
      return modifiers
        .map((modifier) => {
          let description = `${modifier.value.toFixed(1)} ${
            modifier.displayname
          }`;
          if (modifier.type === 'overcapmod') {
            description += ' Overcap';
          }
          return description;
        })
        .join(', ');
    }
  }

  return adornment?.displayname;
}
