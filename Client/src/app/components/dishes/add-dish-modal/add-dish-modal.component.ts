import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { Dish } from '../dish.model';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'menu-add-dish-modal',
  templateUrl: './add-dish-modal.component.html',
  styleUrls: [ './add-dish-modal.component.scss' ]
})
export class AddDishModal {
  @Output() onSave: EventEmitter<Dish> = new EventEmitter();
  @ViewChild('selectCategoryModal')
  modal: ModalComponent;

  // Changes are applied to the global list only after click OK
  item: Dish;

  open(dish: Dish): void {

    // Copy without readonly modifiers
    let configurations = dish.configurations.map(c => Object.assign({}, c));
    this.item = Object.assign({}, dish, { configurations });
    this.modal.open();
  }

  save(): void {
    this.onSave.emit(this.item);
    this.modal.close();
  }
}
