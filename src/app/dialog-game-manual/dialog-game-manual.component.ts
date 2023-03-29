import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-game-manual',
  templateUrl: './dialog-game-manual.component.html',
  styleUrls: ['./dialog-game-manual.component.scss']
})
export class DialogGameManualComponent {
  constructor(private dialog: MatDialog) {}

  onNoClick() {
   this.dialog.closeAll();
  }
} 
