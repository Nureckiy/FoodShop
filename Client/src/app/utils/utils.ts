import { Dish } from '../components/dishes/dish.model';

declare type Comparison = (firstItem: any, secondItem: any) => boolean;

const idComparison: Comparison = (firstItem: any, secondItem: any) => {
  return firstItem.id === secondItem.id;
};

export function mergeSelectedDishes(list: Dish[], dish: Dish): Dish[] {
  return intersectToArray(list, dish, idComparison);
}

export function mergeDishesWithSelected(dishes: Dish[], selected: Dish): Dish[] {
  return replaceInArray(dishes, selected, idComparison);
}

export function mergeNewWithSelectedDishes(newDishes: Dish[], selectedDishes: Dish[]): Dish[] {
  newDishes.map(dish => {
    let selected = selectedDishes.find(s => s.id === dish.id);
    if (selected) {
      return selected;
    }
  });
  return newDishes;
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

function replaceInArray(array: any[], item: any, comparison: Comparison): any[] {
  let index = array.findIndex(a => comparison(a, item));
  if (index >= 0) {
    array[index] = item;
  }
  return array;
}
