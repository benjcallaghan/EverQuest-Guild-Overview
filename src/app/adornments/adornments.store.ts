import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { forkJoin, Observable, pipe } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { build } from '../daybreak-census-options';

interface EquippedAdornment {
  color: string;
  percenttonextlevel?: number;
  spiritlevel?: number;
  id?: number;
  details?: {
    displayname: string;
    modifiers?: Record<
      string,
      { displayname: string; type: string; value: number }
    >;
  };
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

export interface AdornmentsState {
  searching: boolean;
  character?: Character;
  allAdornments?: Item[];
}

@Injectable()
export class AdornmentsStore extends ComponentStore<AdornmentsState> {
  constructor(private http: HttpClient) {
    super({ searching: false });
    this.loadRenewalAdorns();
  }

  public searching$ = this.select((state) => state.searching);
  public character$ = this.select((state) => state.character);
  public allAdornments$ = this.select((state) => state.allAdornments);
  public colors$ = this.select(this.character$, (character) =>
    unique(
      character.equipmentslot_list
        .flatMap((slot) => slot.item.adornment_list)
        .map((adorn) => adorn.color)
        .filter((color) => color !== 'temporary')
    )
  );
  public adornmentSlots$ = this.select(this.character$, (character) => {
    const adornmentSlots: Record<string, Record<string, string[]>> = {};

    for (const equipmentSlot of character.equipmentslot_list) {
      for (const adornSlot of equipmentSlot.item.adornment_list) {
        adornmentSlots[equipmentSlot.name] ??= {};
        adornmentSlots[equipmentSlot.name][adornSlot.color] ??= [];
        adornmentSlots[equipmentSlot.name][adornSlot.color].push(
          adornSlot.details?.modifiers
            ? Object.values(adornSlot.details.modifiers)
                .map((modifier) => {
                  let description = `${modifier.value.toFixed(1)} ${
                    modifier.displayname
                  }`;
                  if (modifier.type === 'overcapmod') {
                    description += ' Overcap';
                  }
                  return description;
                })
                .join(', ')
            : adornSlot.details?.displayname
        );
      }
    }

    return adornmentSlots;
  });
  public organizedAdornments$ = this.select(
    this.allAdornments$,
    (allAdorns) => {
      const sortedAdorns = sortAdornments(allAdorns);
      const adornmentSlots: Record<string, Record<string, string[]>> = {};

      for (const adorn of sortedAdorns) {
        for (const slot of adorn.typeinfo.slot_list) {
          adornmentSlots[slot.name] ??= {};
          adornmentSlots[slot.name][adorn.typeinfo.color] ??= [];
          adornmentSlots[slot.name][adorn.typeinfo.color].push(
            adorn.modifiers
              ? Object.values(adorn.modifiers)
                  .map((modifier) => {
                    let description = `${modifier.value.toFixed(1)} ${
                      modifier.displayname
                    }`;
                    if (modifier.type === 'overcapmod') {
                      description += ' Overcap';
                    }
                    return description;
                  })
                  .join(', ')
              : adorn.displayname
          );
        }
      }

      return adornmentSlots;
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
        forkJoin([
          this.getAdorns('forlorn'),
          this.getAdorns('dreadfell'),
          this.getAdorns('true blood'),
          this.getAdorns('plateaus'),
          this.getAdorns('hizite'),
          this.getAdorns('delta'),
          this.getAdorns('badlands'),
          this.getAdorns('hua collector'),
        ])
      ),
      map((allResults) => allResults.flatMap((results) => results.item_list)),
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

  public currentAdorn = (slot: string, color: string) =>
    this.select(this.adornmentSlots$, (allAdorns) => allAdorns[slot][color]);

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

function sortAdornments(adornments: Item[]): Item[] {
  const adornmentsByModifier: { [key: string]: Item[] } = {};

  // Group adornments by modifier set
  for (const adornment of adornments) {
    const modifierSet = Object.keys(adornment.modifiers).sort();
    const modifierSetKey = JSON.stringify(modifierSet);
    adornmentsByModifier[modifierSetKey] ??= [];
    adornmentsByModifier[modifierSetKey].push(adornment);
  }

  // Sort adornments within each group by increasing modifier value
  for (const adornmentSet of Object.values(adornmentsByModifier)) {
    adornmentSet.sort((a, b) => {
      const modifierNames = Object.keys(a.modifiers).sort();
      for (const modifierName of modifierNames) {
        const aValue = a.modifiers[modifierName].value;
        const bValue = b.modifiers[modifierName].value;
        if (aValue !== bValue) {
          return aValue - bValue;
        }
      }
      return 0;
    });
  }

  // Flatten groups back into a single array.
  return Object.values(adornmentsByModifier).flat();
}
