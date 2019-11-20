import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PLAYERS } from '../mock-players';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
	players: Player[];
	filteredPlayers: Player[];
	constructor() { }

	ngOnInit() {
		this.players = PLAYERS;
		this.filteredPlayers = PLAYERS;
	}

	public async filterChange(searchName: string) {
		this.filteredPlayers.length = 0;
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].name.includes(searchName)) {
				this.filteredPlayers.push(this.filteredPlayers[i]);
			}
		}
		this.filteredPlayers;
	}
}