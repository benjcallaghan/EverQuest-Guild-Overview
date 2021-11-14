import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {
  CensusService,
  CensusCharacter,
  CensusResults,
} from '../census.service';

@Component({
  selector: 'app-ros-flawless',
  templateUrl: './ros-flawless.page.html',
  styleUrls: ['./ros-flawless.page.scss'],
})
export class RosFlawlessPage implements OnInit {
  private static readonly achievements = {
    creator: { type: 'achievement', id: 233108436 },
    kaasThoxXiAtenHaRa: { type: 'achievement', id: 2707319114 },
    zzz: { type: 'achievement', id: 2450032467 },
    betrayer4: { type: 'achievement', id: 235217895 },
    betrayer3: { type: 'achievement', id: 230067965 },
    betrayer2: { type: 'achievement', id: 3037391256 },
    betrayer1: { type: 'achievement', id: 2814330486 },
    xakra: { type: 'achievement', id: 1914889172 },
    vaDynKhar: { type: 'achievement', id: 3373501509 },
    greta: { type: 'achievement', id: 760470014 },
    beastFromBeyond: { type: 'achievement', id: 517383268 },
    grimlock: { type: 'achievement', id: 1384602904 },
    colossus: { type: 'achievement', id: 1251582723 },
    diabo: { type: 'achievement', id: 3188430906 },
    thallXundraxDiabo: { type: 'achievement', id: 1606158253 },
    thallVaXakraFer: { type: 'achievement', id: 3948433922 },
    akhessaVaLiakoVess: { type: 'achievement', id: 1732565854 },
    verrkara: { type: 'achievement', id: 2042129110 },
    emperor: { type: 'achievement', id: 2098276653 },
    nelonHes: { type: 'achievement', id: 1348749755 },
    hoggith: { type: 'achievement', id: 2253932959 },
    fenirekTal: { type: 'achievement', id: 1319033136 },
    khatiSha: { type: 'achievement', id: 745459971 },
    burrowerBeast: { type: 'achievement', id: 983088361 },
    lhurzz: { type: 'achievement', id: 1781623804 },
    jerrek: { type: 'achievement', id: 3548829345 },
    grieg: { type: 'achievement', id: 3061320400 },
  } as const;

  public characters: CensusResults<typeof RosFlawlessPage.achievements>;
  public refreshing = false;

  constructor(
    private readonly census: CensusService,
    private readonly storage: Storage
  ) {}

  async ngOnInit(): Promise<void> {
    this.refreshing = true;
    try {
      const characters: CensusCharacter[] =
        (await this.storage.get('characters')) ?? [];
      const ids = characters.map((c) => c.id);
      this.characters = await this.census.queryCurrentStatus(
        ids,
        RosFlawlessPage.achievements
      );
    } finally {
      this.refreshing = false;
    }
  }
}
