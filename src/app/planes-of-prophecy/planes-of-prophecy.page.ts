import { Component } from '@angular/core';
import { CensusService } from '../census.service';

type Boss = {
  name: string;
  tier: number;
  neededBy: string[];
};

interface Dungeon {
  name: string;
  bosses: Boss[][];
}

@Component({
  selector: 'app-planes-of-prophecy',
  templateUrl: './planes-of-prophecy.page.html',
  styleUrls: ['./planes-of-prophecy.page.scss'],
})
export class PlanesOfProphecyPage {
  public searching = false;
  public searchResults: any[] = [];
  public characters: any[] = [];
  public dungeons: Dungeon[] = [];

  public includeTier1 = true;
  public includeTier2 = false;
  public includeTier3 = false;
  public includeTier4 = false;

  constructor(private census: CensusService) {}

  public async search(name: string | number, serverId: number): Promise<void> {
    this.searching = true;
    try {
      const results = await this.census.getCharacterByName(name as string, serverId);
      this.searchResults = results.character_list;
    } finally {
      this.searching = false;
    }
  }

  public add(character: any): void {
    this.characters.push(character);
  }

  public remove(index: number): void {
    this.characters.splice(index, 1);
  }

  public includeTier(tier: number): boolean {
    switch (tier) {
      case 1:
        return this.includeTier1;
      case 2:
        return this.includeTier2;
      case 3:
        return this.includeTier3;
      case 4:
        return this.includeTier4;
    }
  }

  public async buildReport(): Promise<void> {
    const {
      character_list: characters,
    } = await this.census.getCharactersWithAchievements(this.characters);
    this.dungeons = [
      {
        name: 'Plane of Innovation: The Wasteyards',
        bosses: [
          [
            {
              name: 'Manaetic Prototype IX',
              tier: 1,
              neededBy: charactersWhoNeed(1907461613),
            },
            {
              name: 'Manaetic Prototype XI',
              tier: 1,
              neededBy: charactersWhoNeed(2902072953),
            },
            {
              name: 'Tin Overseer Alpha',
              tier: 1,
              neededBy: charactersWhoNeed(1678272255),
            },
            {
              name: 'Tin Overseer Omega',
              tier: 1,
              neededBy: charactersWhoNeed(995556385),
            },
            {
              name: 'Karnah of the Source',
              tier: 2,
              neededBy: charactersWhoNeed(2398832940),
            },
            {
              name: 'Construct Automaton',
              tier: 2,
              neededBy: charactersWhoNeed(647369654),
            },
            {
              name: 'Gearbox the Energy Siphon',
              tier: 2,
              neededBy: charactersWhoNeed(858460839),
            },
            {
              name: 'The Junk Beast',
              tier: 2,
              neededBy: charactersWhoNeed(2737087936),
            },
            {
              name: 'Meldrath the Mechanized',
              tier: 2,
              neededBy: charactersWhoNeed(2520638812),
            },
            {
              name: 'Meldrath the Malignant',
              tier: 3,
              neededBy: charactersWhoNeed(1396195631),
            },
            {
              name: 'Junkyard Mawg',
              tier: 3,
              neededBy: charactersWhoNeed(1229123830),
            },
            {
              name: 'Operator Figl',
              tier: 3,
              neededBy: charactersWhoNeed(3426269162),
            },
            {
              name: 'The Manaetic Behemoth',
              tier: 4,
              neededBy: charactersWhoNeed(611942787),
            },
          ],
        ],
      },
      {
        name: 'Plane of Disease: Virulent Insurrection',
        bosses: [
          [
            {
              name: 'Dysperitia',
              tier: 1,
              neededBy: charactersWhoNeed(1410201382),
            },
            {
              name: 'Resnake and Rythrak',
              tier: 1,
              neededBy: charactersWhoNeed(891901180),
            },
            {
              name: 'Rankle',
              tier: 1,
              neededBy: charactersWhoNeed(3993512186),
            },
            {
              name: 'Plaguen the Piper',
              tier: 2,
              neededBy: charactersWhoNeed(553409976),
            },
            {
              name: 'Corpulus',
              tier: 2,
              neededBy: charactersWhoNeed(1540902217),
            },
            {
              name: 'Wretch',
              tier: 2,
              neededBy: charactersWhoNeed(1854689738),
            },
            {
              name: 'Nightlure the Fleshfeaster',
              tier: 3,
              neededBy: charactersWhoNeed(290033981),
            },
            {
              name: 'Pox',
              tier: 3,
              neededBy: charactersWhoNeed(1993720173),
            },
            {
              name: 'Grummus',
              tier: 3,
              neededBy: charactersWhoNeed(2412770847),
            },
            {
              name: "Skal'sli the Wretched",
              tier: 3,
              neededBy: charactersWhoNeed(3044659179),
            },
            {
              name: 'Bertoxxulous',
              tier: 4,
              neededBy: charactersWhoNeed(1107945888),
            },
          ],
        ],
      },
      {
        name: 'Torden, Bastion of Thunder: Storm Surge',
        bosses: [
          [
            {
              name: 'Valbrand and Thanbrand',
              tier: 1,
              neededBy: charactersWhoNeed(3893474000),
            },
            {
              name: 'Wybjorn',
              tier: 1,
              neededBy: charactersWhoNeed(4168784669),
            },
            {
              name: 'Eindride Icestorm',
              tier: 2,
              neededBy: charactersWhoNeed(3032312480),
            },
            {
              name: 'Thunderclap and Skyfury',
              tier: 2,
              neededBy: charactersWhoNeed(3543709875),
            },
            {
              name: 'Erech Eyford',
              tier: 2,
              neededBy: charactersWhoNeed(3819890458),
            },
            {
              name: 'Sandstorm, Steelthorn, Sutherland, and Stormseer',
              tier: 2,
              neededBy: charactersWhoNeed(531969117),
            },
            {
              name: 'Kuanbyr Hailstorm',
              tier: 3,
              neededBy: charactersWhoNeed(445873788),
            },
            {
              name: 'Stormtide and Sandstorm',
              tier: 3,
              neededBy: charactersWhoNeed(3241773308),
            },
            {
              name: 'Wavecrasher and Firestorm',
              tier: 3,
              neededBy: charactersWhoNeed(1413408815),
            },
            {
              name: 'Thundercall and Cyclone',
              tier: 3,
              neededBy: charactersWhoNeed(2802698072),
            },
            {
              name: 'Agnarr the Storm Lord',
              tier: 4,
              neededBy: charactersWhoNeed(793363251),
            },
          ],
        ],
      },
      {
        name: 'Brackish Vaults: Realm of the Triumvirate',
        bosses: [
          [
            {
              name: "Dyronis, Harbinger of E'ci",
              tier: 3,
              neededBy: charactersWhoNeed(3107883309),
            },
            {
              name: 'Rheumus, Harbinger of Tarew Marr',
              tier: 3,
              neededBy: charactersWhoNeed(1804925641),
            },
            {
              name: 'Eurold, Harbinger of Povar',
              tier: 3,
              neededBy: charactersWhoNeed(2499347325),
            },
          ],
        ],
      },
      {
        name: "Solusek Ro's Tower: Citadel of the Sun",
        bosses: [
          [
            { name: 'Ferris', tier: 1, neededBy: charactersWhoNeed(518709793) },
            {
              name: 'Veleroth and Zrexul',
              tier: 1,
              neededBy: charactersWhoNeed(551560483),
            },
            { name: 'Bling', tier: 1, neededBy: charactersWhoNeed(3854273865) },
            {
              name: 'Guardian and Protector of Dresolik',
              tier: 2,
              neededBy: charactersWhoNeed(637835300),
            },
            {
              name: 'Brundin of the Guard',
              tier: 2,
              neededBy: charactersWhoNeed(2228633573),
            },
            { name: 'Amohn', tier: 2, neededBy: charactersWhoNeed(2055522817) },
            {
              name: 'Arlyxir',
              tier: 3,
              neededBy: charactersWhoNeed(2786296772),
            },
            {
              name: 'Rizlona',
              tier: 3,
              neededBy: charactersWhoNeed(4199050345),
            },
            {
              name: 'Feridus Emberblaze',
              tier: 4,
              neededBy: charactersWhoNeed(3735656700),
            },
            {
              name: 'Grezou',
              tier: 4,
              neededBy: charactersWhoNeed(3806337217),
            },
            {
              name: 'Solusek Ro',
              tier: 4,
              neededBy: charactersWhoNeed(2464252762),
            },
          ],
        ],
      },
      {
        name: 'Shard of Hate: Reignted Hatred',
        bosses: [
          [
            {
              name: 'The Deathrot Knight',
              tier: 1,
              neededBy: charactersWhoNeed(637848167),
            },
            {
              name: 'The Culler of Bones',
              tier: 1,
              neededBy: charactersWhoNeed(3016601088),
            },
            {
              name: 'The Arch Bonefiend',
              tier: 1,
              neededBy: charactersWhoNeed(2882741806),
            },
            {
              name: 'The Lord of Decay',
              tier: 1,
              neededBy: charactersWhoNeed(2500163944),
            },
          ],
          [
            {
              name: 'The Mistress of Scorn',
              tier: 1,
              neededBy: charactersWhoNeed(943992612),
            },
            {
              name: 'The Lord of Loathing',
              tier: 1,
              neededBy: charactersWhoNeed(2825330142),
            },
            {
              name: 'The Lord of Ire',
              tier: 1,
              neededBy: charactersWhoNeed(855835012),
            },
            {
              name: 'The Master of Spite',
              tier: 2,
              neededBy: charactersWhoNeed(1735660121),
            },
          ],
          [
            {
              name: "The Hoarder P'Lewt",
              tier: 1,
              neededBy: charactersWhoNeed(1339018976),
            },
            {
              name: 'The Phantom Wraith',
              tier: 1,
              neededBy: charactersWhoNeed(1893595057),
            },
            {
              name: 'The Bleeder of Ire',
              tier: 2,
              neededBy: charactersWhoNeed(942131495),
            },
            {
              name: "The Master P'Tasa",
              tier: 2,
              neededBy: charactersWhoNeed(3995152265),
            },
          ],
          [
            {
              name: "High Priest M'kari",
              tier: 1,
              neededBy: charactersWhoNeed(1132325801),
            },
            {
              name: 'The Hand of Maestro',
              tier: 2,
              neededBy: charactersWhoNeed(1396352827),
            },
            {
              name: 'Demetrius Crane',
              tier: 2,
              neededBy: charactersWhoNeed(1282023409),
            },
            {
              name: "The Deathspinner K'dora",
              tier: 2,
              neededBy: charactersWhoNeed(2194354002),
            },
          ],
          [
            {
              name: "Coercer T'vala",
              tier: 1,
              neededBy: charactersWhoNeed(2063877403),
            },
            {
              name: "Dreadlord D'Somni",
              tier: 2,
              neededBy: charactersWhoNeed(1812106951),
            },
            {
              name: "Grandmaster R'Tal",
              tier: 2,
              neededBy: charactersWhoNeed(3043264006),
            },
            {
              name: 'The Avatar of Abhorrence',
              tier: 3,
              neededBy: charactersWhoNeed(2336092784),
            },
          ],
          [
            {
              name: 'The Ashenbone Broodmaster',
              tier: 3,
              neededBy: charactersWhoNeed(2249472210),
            },
            {
              name: 'The Avatar of Bone',
              tier: 3,
              neededBy: charactersWhoNeed(1044351417),
            },
            {
              name: "Kpul D'Vngur, Maestro of Rancor",
              tier: 3,
              neededBy: charactersWhoNeed(918257925),
            },
            {
              name: 'Byzola',
              tier: 3,
              neededBy: charactersWhoNeed(1547974772),
            },
          ],
          [
            {
              name: 'Innoruuk, God of Hate',
              tier: 4,
              neededBy: charactersWhoNeed(1709297961),
            },
          ],
        ],
      },
    ];
    console.log(this.dungeons);

    function charactersWhoNeed(achievementId: number): string[] {
      return characters
        .filter(
          (character) =>
            !character.achievements.achievement_list[achievementId]
              ?.completed_timestamp
        )
        .map((character) => character.name.first);
    }
  }
}
