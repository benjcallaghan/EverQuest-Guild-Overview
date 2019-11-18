import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  public servers = [
    'Antonia Bayle',
    'Beta',
    'Halls of Fate',
    'Isle of Refuge',
    'Kaladim',
    'Maj\' Dul',
    'Rivervale',
    'Skyfire',
    'Test',
    'Thurgadin'
  ];

  constructor() { }

  ngOnInit() {
  }

}
