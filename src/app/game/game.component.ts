import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GSM } from './game-state-manager.service';

@Component({
  selector: 'gm-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit{
  constructor(public gameStateManager: GSM) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.gameStateManager.newGame("firstGame", 20, 20, "forest")
    })
  }
}
