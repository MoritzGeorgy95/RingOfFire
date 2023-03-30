import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Game } from '../models/models';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { DialogGameManualComponent } from '../dialog-game-manual/dialog-game-manual.component';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';
import { Firestore } from '@angular/fire/firestore';
import { shuffle } from '../models/models';
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
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public matTooltip: MatTooltipModule,
    public viewContainerRef: ViewContainerRef,
    private firestore: Firestore,
    public router: Router,
    private location: Location
  ) {}

  game: Game;
  gender: string;
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
        this.setGame();
      } else {
        alert('No game in database with current ID!');
      }
    });

    //listen for real time updates
    onSnapshot(doc(this.gamesCollection, this.gameUrl), (doc) => {
      if (doc.exists()) {
        this.currentGame = doc.data();
        this.setGame();
      }
    });
  }

  drawCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.updateDatabase();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateDatabase();
      }, 1000);
    } else if (!this.game.pickCardAnimation && this.game.stack.length == 0) {
      for (let i = 1; i < 14; i++) {
        this.game.stack.push('hearts_' + i);
      }
      for (let i = 1; i < 14; i++) {
        this.game.stack.push('ace_' + i);
      }
      for (let i = 1; i < 14; i++) {
        this.game.stack.push('clubs_' + i);
      }
      for (let i = 1; i < 14; i++) {
        this.game.stack.push('diamonds_' + i);
      }

      shuffle(this.game.stack);
    }
  }

  newGame() {
    this.game = new Game();
  }

  openGameInfoDialog() {
    this.dialog.open(DialogGameManualComponent, {
      viewContainerRef: this.viewContainerRef,
      data: { URL: this.gameUrl }
    });
  }

  openEditDialog() {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent, {
      viewContainerRef: this.viewContainerRef,
      data: { players: this.game.players, gender: this.game.gender },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.game.players = result.players;
        this.game.gender = result.gender;
        this.updateDatabase();
      }
    });
  }

  openAddPlayerDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      viewContainerRef: this.viewContainerRef,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.name = result.name;
      this.gender = result.male;

      if (this.gender) {
        this.game.gender.push('male');
      } else if (!this.gender) {
        this.game.gender.push('female');
      }

      if (this.name != '') {
        this.game.players.push(this.name);
      }
      this.updateDatabase();
    });
  }

  nextPlayer() {
    if (this.game.players.length > 1) {
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
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

  backToMenu() {
    this.router.navigateByUrl('');
  }

  setGame() {
    this.game.stack = this.currentGame.stack;
    this.game.players = this.currentGame.players;
    this.game.playedCards = this.currentGame.playedCards;
    this.game.currentPlayer = this.currentGame.currentPlayer;
    this.game.pickCardAnimation = this.currentGame.pickCardAnimation;
    this.game.currentCard = this.currentGame.currentCard;
    this.game.gender = this.currentGame.gender;
  }
}
