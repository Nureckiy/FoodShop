import { DishConfiguration } from './dish-configuration.model';

export interface Dish {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  configurations: DishConfiguration[];
}
