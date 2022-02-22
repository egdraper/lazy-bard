import { Component, OnInit } from '@angular/core';
import { GSM } from './game-state-manager.service';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(public gameStateManager: GSM) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameStateManager.newGame("firstGame", 50, 50, "forrest")
    })
  }

}
