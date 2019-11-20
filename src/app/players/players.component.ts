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
		this.filteredPlayers = this.players;
	}

	public filterChange(searchName: string) {
		if (searchName != "") {
			this.filteredPlayers = this.players.filter(player => player.name.toLowerCase().includes(searchName.toLowerCase()));
		}
		else {
			this.filteredPlayers = this.players;
		}
	}
}