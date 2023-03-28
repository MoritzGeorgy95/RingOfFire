import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-join-game',
  templateUrl: './dialog-join-game.component.html',
  styleUrls: ['./dialog-join-game.component.scss']
})
export class DialogJoinGameComponent {
  id:string

  constructor(private dialog: MatDialog) {}

  onNoClick() {
   this.dialog.closeAll();
  }
}
