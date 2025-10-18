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

    thawedRivalry(character: CensusCharacter): string {
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

    private getProgressText(character: CensusCharacter, quest: string): string {
        console.assert(character.misc !== undefined);
        return character.misc!.quest_list[quest].requiredItem_list[0]
            .progress_text;
    }
}
