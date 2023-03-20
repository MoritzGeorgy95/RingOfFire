import { Component } from '@angular/core';
import { Game } from '../models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  
  game: Game;
  pickCardAnimation = false;

  drawCard() {
    this.pickCardAnimation= true;
  }

  newGame() {
    this.game= new Game();
  }
}
