import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Game } from '../models/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  collectionData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  addDoc,
  onSnapshot,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { update } from 'firebase/database';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})










export class GameComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public viewContainerRef: ViewContainerRef,
    private firestore: Firestore,
    public router: ActivatedRoute
  ) {}

  game: Game;
  pickCardAnimation = false;
  currentCard: any;
  name: string;
  gameUrl: string;
  gamesCollection: CollectionReference<DocumentData>;

  ngOnInit(){


    this.newGame();
    this.gamesCollection = collection(this.firestore, 'games');
    const currentGame= onSnapshot(doc(this.gamesCollection, "PkES8Q9qpMk5FtYBNiDl"), (doc) => {
      console.log("Current data: ", doc.data())})
    
  }

  drawCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        // this.ngOnChange();
        this.pickCardAnimation = false;
      }, 1000);
    }
   
  }

  newGame() {
    this.game = new Game();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      viewContainerRef: this.viewContainerRef,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.name = result;
      if (this.name != undefined) {
        this.game.players.push(this.name);
      }
      // this.ngOnChange();
    });
  }

  nextPlayer() {
    if (this.game.players.length > 1) {
      this.game.currentPlayer++;
      this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
      // this.ngOnChange();
    }
  }

  ngOnChange() {
    // const id = this.gameUrl.split('/')[1];
    // const documentReference = doc(this.firestore, `games/${id}`);
    // updateDoc(documentReference, this.game.toJSON());
  }
}
