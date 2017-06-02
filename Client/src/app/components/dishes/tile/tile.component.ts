import { Component, Input } from '@angular/core';
import { Dish } from '../dish.model';


@Component({
  selector: 'menu-tile',
  templateUrl: './tile.component.html',
  styleUrls: [ './tile.component.scss' ]
})
export class TileComponent {
  @Input() item: Dish;
}
