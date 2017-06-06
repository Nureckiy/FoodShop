import { Dish } from '../components/dishes/dish.model';
import {DishConfiguration} from '../components/dishes/dish-configuration.model';
import {forEach} from '@angular/router/src/utils/collection';

declare type Comparison = (firstItem: any, secondItem: any) => boolean;

const idComparison: Comparison = (firstItem: any, secondItem: any) => {
  return firstItem.id === secondItem.id;
};

export function mergeSelectedDishes(list: Dish[], dish: Dish): Dish[] {
  return intersectToArray(list, dish, idComparison);
}

export function mergeDishesArrayWithItem(dishes: Dish[], selected: Dish): Dish[] {
  return replaceInArray(dishes, selected, idComparison);
}

export function replaceSuitableDishes(primary: Dish[], substitutional: Dish[]): Dish[] {
  return primary.map(dish => {
    let selected = substitutional.find(s => s.id === dish.id);
    if (selected) {
      return selected;
    } else {
      return dish;
    }
  });
}

export function mergeDishes(source: Dish[], destination: Dish[]) {
  return intersectArrays(source, destination, idComparison);
}

export function replaceConfiguration(dish: Dish, configuration: DishConfiguration): Dish {
  replaceInArray(dish.configurations, configuration, idComparison);
  return dish;
}

function intersectToArray(array: any[], item: any, comparison: Comparison): any[] {
  let index = array.findIndex(a => comparison(a, item));
  if (index === -1) {
    array.push(item);
  } else {
    array[index] = item;
  }
  return array;
}

function intersectArrays(source: any[], destination: any[], comparison: Comparison): any[] {
  let newArray = Object.assign([], destination);
  newArray.forEach(item => destination = intersectToArray(source, item, comparison));
  return destination;
}

function replaceInArray(array: any[], item: any, comparison: Comparison): any[] {
  let index = array.findIndex(a => comparison(a, item));
  if (index >= 0) {
    array[index] = item;
  }
  return array;
}
