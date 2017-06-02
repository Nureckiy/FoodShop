import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Dish} from '../components/dishes/dish.model';
import config from '../config';
import {Observable} from 'rxjs';

@Injectable()
export class DishService {

  constructor(private http: Http) { }

  getPopular(count: number): Observable<Dish[]> {
    return this.http.get(`${config.apiPath}/dish/getPopular?count=${count}`)
      .map(response => response.json());
  }

  getByCategoryName(category: string): Observable<Dish[]> {
    return this.http.get(`${config.apiPath}/dish/getDishesByCategoryName?name=${category}`)
      .map(response => response.json() as Dish[]);
  }
}

