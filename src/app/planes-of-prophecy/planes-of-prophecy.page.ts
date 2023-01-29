import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CensusService } from '../census.service';
import { CharacterService } from '../character.service';
import { QuestIconComponent } from '../quest-icon/quest-icon.component';

@Component({
  selector: 'app-planes-of-prophecy',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, IonicModule, QuestIconComponent],
  templateUrl: './planes-of-prophecy.page.html',
  styleUrls: ['./planes-of-prophecy.page.scss'],
})
export default class PlanesOfProphecyPage {
  public refreshing = false;
  public characters$ = defer(() => {
    this.refreshing = true;
    return this.characterService.getAllCharacters();
  }).pipe(
    map((characters) => characters.map((c) => c.id)),
    switchMap((ids) =>
      this.census.queryQuestStatus(ids, {
        manaeticPrototypeIX: { type: 'achievement', id: 1907461613 },
        manaeticPrototypeXI: { type: 'achievement', id: 2902072953 },
        tinOverseerAlpha: { type: 'achievement', id: 1678272255 },
        tinOverseerOmega: { type: 'achievement', id: 995556385 },
        karnahOfTheSource: { type: 'achievement', id: 2398832940 },
        constructAutomaton: { type: 'achievement', id: 647369654 },
        gearboxTheEnergySiphon: { type: 'achievement', id: 858460839 },
        theJunkBeast: { type: 'achievement', id: 2737087936 },
        meldrathTheMechanized: { type: 'achievement', id: 2520638812 },
        meldrathTheMalignant: { type: 'achievement', id: 1396195631 },
        junkyardMawg: { type: 'achievement', id: 1229123830 },
        operatorFigl: { type: 'achievement', id: 3426269162 },
        theManaeticBehemoth: { type: 'achievement', id: 611942787 },
        dysperitia: { type: 'achievement', id: 1410201382 },
        resnakeAndRythrak: { type: 'achievement', id: 891901180 },
        rankle: { type: 'achievement', id: 3993512186 },
        plaguenThePiper: { type: 'achievement', id: 553409976 },
        corpulus: { type: 'achievement', id: 1540902217 },
        wretch: { type: 'achievement', id: 1854689738 },
        nightlureTheFleshfeaster: { type: 'achievement', id: 290033981 },
        pox: { type: 'achievement', id: 1993720173 },
        grummus: { type: 'achievement', id: 2412770847 },
        skalsliTheWretched: { type: 'achievement', id: 3044659179 },
        bertoxxulous: { type: 'achievement', id: 1107945888 },
        valbrandAndThangbrand: { type: 'achievement', id: 3893474000 },
        wybjorn: { type: 'achievement', id: 4168784669 },
        eindrideIcestorm: { type: 'achievement', id: 3032312480 },
        thunderclapAndSkyfury: { type: 'achievement', id: 3543709875 },
        erechEyford: { type: 'achievement', id: 3819890458 },
        sandstormSteelthornSutherlandAndStormseer: {
          type: 'achievement',
          id: 531969117,
        },
        kuanbyrHailstorm: { type: 'achievement', id: 445873788 },
        stormtideAndSandstorm: { type: 'achievement', id: 3241773308 },
        wavecrasherAndFirestorm: { type: 'achievement', id: 1413408815 },
        thundercallAndCyclone: { type: 'achievement', id: 2802698072 },
        agnarrTheStormLord: { type: 'achievement', id: 793363251 },
        dyronisHarbingerOfEci: { type: 'achievement', id: 3107883309 },
        rheumusHarbingerOfTarewMarr: { type: 'achievement', id: 1804925641 },
        euroldHarbingerOfPovar: { type: 'achievement', id: 2499347325 },
        ferris: { type: 'achievement', id: 518709793 },
        velerothAndZrexul: { type: 'achievement', id: 551560483 },
        bling: { type: 'achievement', id: 3854273865 },
        guardianAndProtectorOfDresolik: { type: 'achievement', id: 637835300 },
        brundinOfTheGuard: { type: 'achievement', id: 2228633573 },
        amohn: { type: 'achievement', id: 2055522817 },
        arlyxir: { type: 'achievement', id: 2786296772 },
        rizlona: { type: 'achievement', id: 4199050345 },
        feridusEmberblaze: { type: 'achievement', id: 3735656700 },
        grezou: { type: 'achievement', id: 3806337217 },
        solusekRo: { type: 'achievement', id: 2464252762 },
        theDeathrotKnight: { type: 'achievement', id: 637848167 },
        theCullerOfBones: { type: 'achievement', id: 3016601088 },
        theArchBonefined: { type: 'achievement', id: 2882741806 },
        theLordOfDecay: { type: 'achievement', id: 2500163944 },
        theMistressOfScorn: { type: 'achievement', id: 943992612 },
        theLordOfLoathing: { type: 'achievement', id: 2825330142 },
        theLordOfIre: { type: 'achievement', id: 855835012 },
        theMasterOfSpite: { type: 'achievement', id: 1735660121 },
        theHoarderPlewt: { type: 'achievement', id: 1339018976 },
        thePhantomWraith: { type: 'achievement', id: 1893595057 },
        theBleederOfIre: { type: 'achievement', id: 942131495 },
        theMasterPtasa: { type: 'achievement', id: 3995152265 },
        highPriestMkari: { type: 'achievement', id: 1132325801 },
        theHandOfMaestro: { type: 'achievement', id: 1396352827 },
        demetriusCrane: { type: 'achievement', id: 1282023409 },
        theDeathspinnerKdora: { type: 'achievement', id: 2194354002 },
        coercerTvala: { type: 'achievement', id: 2063877403 },
        dreadlordDsomni: { type: 'achievement', id: 1812106951 },
        grandmasterRtal: { type: 'achievement', id: 3043264006 },
        theAvatarOfAbhorrence: { type: 'achievement', id: 2336092784 },
        theAshenboneBroodmaster: { type: 'achievement', id: 2249472210 },
        theAvatarOfBone: { type: 'achievement', id: 1044351417 },
        kpulDvngurMaestroOfRancor: { type: 'achievement', id: 918257925 },
        byzola: { type: 'achievement', id: 1547974772 },
        innoruukGodOfHate: { type: 'achievement', id: 1709297961 },
      })
    ),
    tap({
      next: () => (this.refreshing = false),
      error: () => (this.refreshing = false),
    })
  );

  constructor(
    private readonly census: CensusService,
    private readonly characterService: CharacterService
  ) {}
}
