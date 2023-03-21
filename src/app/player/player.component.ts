import { Component, Input } from '@angular/core';
import { Game } from '../models/models';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  
  @Input() name:string; 
  @Input() playerActive:boolean;
}
