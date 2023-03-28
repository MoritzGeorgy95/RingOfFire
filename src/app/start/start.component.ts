import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DialogJoinGameComponent } from '../dialog-join-game/dialog-join-game.component';
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



@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {

  constructor(private router: Router,  public dialog: MatDialog, private firestore: Firestore) {}  

  newGame() {
    //start game 
    this.router.navigateByUrl('/game/new');
  }

  joinGame() {
    this.openDialog();
  }

  async checkExistingGame(id:string) {
    const docRef = doc(this.firestore, 'games', id);
    const snap = await getDoc(docRef);
    return snap.data();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogJoinGameComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.checkExistingGame(result).then((data) => {
          if (data) {
            this.router.navigateByUrl(`/game/${result}`);                   
          }
          else {
            alert('No game with given ID!');
          }
        })

      }
      

    });
  }


}
