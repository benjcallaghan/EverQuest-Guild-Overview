import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CensusCharacter } from '../census.service';
import { CharacterService } from '../character.service';

@Component({
    selector: 'app-scars-of-destruction',
    imports: [IonicModule, AsyncPipe],
    templateUrl: './scars-of-destruction.page.html',
    styleUrl: './scars-of-destruction.page.scss',
})
export default class ScarsOfDestructionPage {
    constructor(
        private readonly characterService: CharacterService = inject(
            CharacterService
        )
    ) {}

    characters = this.characterService.characters$;

    thawedRivalry(character: CensusCharacter): string | string[] {
        const part4 = '1346401727';
        const part3 = '3458523164';
        const part2 = '3106132106';
        const part1 = '539656496';

        if (character.misc === undefined) {
            return 'Refresh';
        }

        if (part4 in character.misc.completed_quest_list) {
            return 'Complete';
        }
        if (part4 in character.misc.quest_list) {
            return this.getProgressText(character, part4);
        }
        if (part3 in character.misc.completed_quest_list) {
            return 'Start Part 4';
        }
        if (part3 in character.misc.quest_list) {
            return this.getProgressText(character, part3);
        }
        if (part2 in character.misc.completed_quest_list) {
            return 'Start Part 3';
        }
        if (part2 in character.misc.quest_list) {
            return this.getProgressText(character, part2);
        }
        if (part1 in character.misc.completed_quest_list) {
            return 'Start Part 2';
        }
        if (part1 in character.misc.quest_list) {
            return this.getProgressText(character, part1);
        }

        return 'Not Started';
    }

    bondsOfMischief(character: CensusCharacter): string | string[] {
        const part4 = '224232166';
        const part3 = '2469992261';
        const part2 = '3829278675';
        const part1 = '2100786793';

        if (character.misc === undefined) {
            return 'Refresh';
        }

        if (part4 in character.misc.completed_quest_list) {
            return 'Complete';
        }
        if (part4 in character.misc.quest_list) {
            return this.getProgressText(character, part4);
        }
        if (part3 in character.misc.completed_quest_list) {
            return 'Start Part 4';
        }
        if (part3 in character.misc.quest_list) {
            return this.getProgressText(character, part3);
        }
        if (part2 in character.misc.completed_quest_list) {
            return 'Start Part 3';
        }
        if (part2 in character.misc.quest_list) {
            return this.getProgressText(character, part2);
        }
        if (part1 in character.misc.completed_quest_list) {
            return 'Start Part 2';
        }
        if (part1 in character.misc.quest_list) {
            return this.getProgressText(character, part1);
        }

        return 'Not Started';
    }

    depthsOfDestruction(character: CensusCharacter): string | string[] {
        const part2 = '926301496';
        const part1 = '2923392130';

        if (character.misc === undefined) {
            return 'Refresh';
        }

        if (part2 in character.misc.completed_quest_list) {
            return 'Complete';
        }
        if (part2 in character.misc.quest_list) {
            return this.getProgressText(character, part2);
        }
        if (part1 in character.misc.completed_quest_list) {
            return 'Start Part 2';
        }
        if (part1 in character.misc.quest_list) {
            return this.getProgressText(character, part1);
        }

        return 'Not Started';
    }

    weaponForTheAges(character: CensusCharacter): string | string[] {
        const platinum = '1925862104';
        const gold = '97346126';
        const silver = '2611607533';
        const bronze = '3970877307';
        const copper = '1973917377';

        if (character.misc === undefined) {
            return 'Refresh';
        }

        if (platinum in character.misc.completed_quest_list) {
            return 'Complete';
        }
        if (platinum in character.misc.quest_list) {
            return this.getProgressText(character, platinum);
        }
        if (gold in character.misc.completed_quest_list) {
            return 'Start Platinum';
        }
        if (gold in character.misc.quest_list) {
            return this.getProgressText(character, gold);
        }
        if (silver in character.misc.completed_quest_list) {
            return 'Start Gold';
        }
        if (silver in character.misc.quest_list) {
            return this.getProgressText(character, silver);
        }
        if (bronze in character.misc.completed_quest_list) {
            return 'Start Silver';
        }
        if (bronze in character.misc.quest_list) {
            return this.getProgressText(character, bronze);
        }
        if (copper in character.misc.completed_quest_list) {
            return 'Start Bronze';
        }
        if (copper in character.misc.quest_list) {
            return this.getProgressText(character, copper);
        }

        return 'Not Started';
    }

    private getProgressText(
        character: CensusCharacter,
        quest: string
    ): string[] {
        console.assert(character.misc !== undefined);
        return character.misc!.quest_list[quest].requiredItem_list.map(
            (i) => i.progress_text
        );
    }
}
