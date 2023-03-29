import { Component, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent {
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data:any) {
  }


  onNoClick() {
    this.dialog.closeAll();
  }
  
  delete(i:number) {
    this.data.players.splice(i, 1);
    this.data.gender.splice(i, 1);
  }  

}
