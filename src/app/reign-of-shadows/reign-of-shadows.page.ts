import { Component, OnInit } from '@angular/core';
import { CensusService } from '../census.service';

@Component({
  selector: 'app-reign-of-shadows',
  templateUrl: './reign-of-shadows.page.html',
  styleUrls: ['./reign-of-shadows.page.scss'],
})
export class ReignOfShadowsPage implements OnInit {
  guilds: any[];

  constructor(private census: CensusService) { }

  async ngOnInit() {
    this.guilds = await this.census.getReignOfShadowsRankings();
  }
}
