import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { pipe } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { build } from '../daybreak-census-options';

export interface AdornmentsState {
  searching: boolean;
  character?: CharacterWithAdorns;
  colors?: string[];
}

interface SearchResults {
  character_list: Character[];
}

interface Character {
  equipmentslot_list: Array<{
    item: {
      setbonus_list: unknown[];
      modifiers: unknown;
      growth_table?: unknown;
      id: number;
      adornment_list: Array<{
        color: string;
        percenttonextlevel?: number;
        spiritlevel?: number;
        id?: number;
        details?: {
          displayname: string;
        };
      }>;
      details: {
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

interface CharacterWithAdorns extends Character {
  adornmentSlots: Record<string, Record<string, string[]>>;
}

@Injectable()
export class AdornmentsStore extends ComponentStore<AdornmentsState> {
  constructor(private http: HttpClient) {
    super({ searching: false });
  }

  public searching$ = this.select((state) => state.searching);
  public character$ = this.select((state) => state.character);
  public colors$ = this.select((state) => state.colors);

  public searchForCharacter = this.effect<[string, number]>(
    pipe(
      tap(() => this.patchState({ searching: true })),
      exhaustMap(([name, server]) =>
        this.http.get<SearchResults>(
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
                show: ['displayname'],
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

        const adornmentSlots: Record<string, Record<string, string[]>> = {};
        for (const equipmentSlot of character.equipmentslot_list) {
          for (const adornSlot of equipmentSlot.item.adornment_list) {
            adornmentSlots[equipmentSlot.name] ??= {};
            adornmentSlots[equipmentSlot.name][adornSlot.color] ??= [];
            adornmentSlots[equipmentSlot.name][adornSlot.color].push(
              adornSlot.details?.displayname
            );
          }
        }

        this.patchState({
          searching: false,
          character: {
            ...character,
            adornmentSlots,
          },
          colors: unique(
            character.equipmentslot_list
              .flatMap((slot) => slot.item.adornment_list)
              .map((adorn) => adorn.color)
              .filter((color) => color !== 'temporary')
          ),
        });
      })
    )
  );
}

function unique<Item>(arr: Item[]): Item[] {
  return arr.filter((_, i) => arr.indexOf(arr[i]) === i);
}
