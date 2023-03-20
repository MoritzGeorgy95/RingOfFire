import { Component, OnInit } from '@angular/core';
import { Game } from '../models/models';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  game: Game;
  pickCardAnimation = false;
  currentCard: any;

  ngOnInit(): void {
    this.newGame()
  }

  drawCard() {
    this.pickCardAnimation= true;
    this.currentCard = this.game.stack.pop();
    console.log(this.currentCard);
  }

  newGame() {
    this.game= new Game();
    console.log(this.game);
  }
}


