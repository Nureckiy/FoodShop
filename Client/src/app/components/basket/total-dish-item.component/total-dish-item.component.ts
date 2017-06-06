import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Dish} from '../../dishes/dish.model';
import {DishConfiguration} from '../../dishes/dish-configuration.model';
import * as utils from '../../../utils/utils';

@Component({
  selector: 'menu-basket-total-dish-item-component',
  templateUrl: './total-dish-item.component.html',
  styleUrls: [ './total-dish-item.component.scss' ]
})
export class TotalDishItemComponent {

  dish: Dish;

  @Input() set item(value: Dish) {
    let configurations = value.configurations.map(c => Object.assign({}, c));
    this.dish = Object.assign({}, value, { configurations });
  };
  @Output() onChange: EventEmitter<Dish> = new EventEmitter();

  updateConfiguration(): void {
    // setTimeout(() => {
    //   this.onChange.emit(this.dish);
    // }, 0);
    this.onChange.emit(this.dish);
  }

  increase(configuration: DishConfiguration): void {
    this.changeNumber(configuration, configuration.numberOfSelected + 1);
  }

  decrease(configuration: DishConfiguration): void {
    this.changeNumber(configuration, configuration.numberOfSelected - 1);
  }

  delete(configuration: DishConfiguration): void {
    this.changeNumber(configuration, 0);
  }

  changeNumber(configuration: DishConfiguration, count: number): void {
    configuration.numberOfSelected = count;
    this.dish = utils.replaceConfiguration(this.dish, configuration);
    this.updateConfiguration();
  }
}


