import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { asapScheduler, defer } from 'rxjs';
import { map, subscribeOn, tap } from 'rxjs/operators';
import { CensusService } from '../census.service';

@Component({
  selector: 'app-adornments',
  standalone: true,
  imports: [IonicModule, FormsModule, NgIf, AsyncPipe, NgFor],
  templateUrl: './adornments.page.html',
  styleUrls: ['./adornments.page.scss'],
})
export default class AdornmentsComponent implements OnInit {
  protected searchName?: string;
  protected searchServer?: number;
  protected searching = false;
  searchResults$: any;

  constructor(private census: CensusService) {}

  ngOnInit() {}

  protected searchForCharacter(): void {

  }
}
