import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Game } from '../models/models';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(public dialog: MatDialog, public viewContainerRef: ViewContainerRef) {}

  game: Game;
  pickCardAnimation = false;
  currentCard: any;
  name:string;

  ngOnInit(): void {
    this.newGame();
  }

  drawCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);

      // setTimeout(()=> {
      // }, 2000)
    }
  }

  newGame() {
    this.game = new Game();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      viewContainerRef: this.viewContainerRef
    });

      dialogRef.afterClosed().subscribe(result => {
        this.name = result;
        if (this.name != undefined) {
          this.game.players.push(this.name);          
        }
      });
    }
  
  nextPlayer() {
    if (this.game.players.length > 1) {
      this.game.currentPlayer++;
      this.game.currentPlayer= this.game.currentPlayer % this.game.players.length;
    }
   
  }
}
