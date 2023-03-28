import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Game } from '../models/models';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore } from '@angular/fire/firestore';
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
import { Location } from '@angular/common';

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
    public router: ActivatedRoute,
    private location: Location
  ) {}

  game: Game;
  pickCardAnimation = false;
  currentCard: any;
  name: string;
  gameUrl: any;
  gamesCollection: CollectionReference<DocumentData>;
  currentGame: any;

  ngOnInit() {
    this.gamesCollection = collection(this.firestore, 'games');
    this.gameUrl = this.location.path().split('/')[2];

    this.checkExistingGame().then((data) => {
      if (this.gameUrl === 'new') {
        this.newGame();
        addDoc(this.gamesCollection, this.game.toJSON()).then((docRef) => {
          this.gameUrl = docRef.id;
          this.location.go(`/game/${this.gameUrl}`);
        });
      } else if (data) {
        this.newGame();
        this.currentGame = data;
        this.game.stack = this.currentGame.stack;
        this.game.players = this.currentGame.players;
        this.game.playedCards = this.currentGame.playedCards;
        this.game.currentPlayer = this.game.currentPlayer;
      } else {
        alert('No game in database with current ID!');
      }
    });

    //listen for real time updates 
    onSnapshot(doc(this.gamesCollection, this.gameUrl), (doc) => {
      if (doc.exists()) {
        this.currentGame = doc.data();
        this.game.stack = this.currentGame.stack;
        this.game.players = this.currentGame.players;
        this.game.playedCards = this.currentGame.playedCards;
        this.game.currentPlayer = this.currentGame.currentPlayer;
      }}
    )
  }

  drawCard() {
    if (!this.pickCardAnimation) {
      this.pickCardAnimation = true;
      this.currentCard = this.game.stack.pop();

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.updateDatabase();
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
      this.updateDatabase();
    });
  }

  nextPlayer() {
    if (this.game.players.length > 1) {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      console.log(this.game.currentPlayer);
      this.updateDatabase();
    }
  }

  async updateDatabase() {
    const documentReference = doc(this.firestore, `games/${this.gameUrl}`);
    await updateDoc(documentReference, this.game.toJSON());
  }

  async checkExistingGame() {
    const docRef = doc(this.firestore, 'games', this.gameUrl);
    const snap = await getDoc(docRef);
    return snap.data();
  }
}

// this.currentGame = onSnapshot(
//   doc(this.gamesCollection, this.gameUrl),
//   (doc) => {
//     console.log('Current data: ', doc.data());
//   }
// );
