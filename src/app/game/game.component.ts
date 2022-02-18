import { Component, OnInit } from '@angular/core';
import { GSM } from './game-state-manager.service';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(gameStateManager: GSM) { 
    gameStateManager.newGame("firstGame")
  }

  ngOnInit(): void {
  }

}
