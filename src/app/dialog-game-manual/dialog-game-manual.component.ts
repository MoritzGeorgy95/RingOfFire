import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-game-manual',
  templateUrl: './dialog-game-manual.component.html',
  styleUrls: ['./dialog-game-manual.component.scss']
})
export class DialogGameManualComponent {
  
  

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data:any) {}


  onNoClick() {
   this.dialog.closeAll();
  }

  copy(text:string) {
    navigator.clipboard.writeText(text)
    .then(() => {
      alert(`Copied to clipboard: ${text}`);
    })
    .catch((err) => {
      console.error(`Error copying to clipboard: ${err}`);
    });
  }
} 
