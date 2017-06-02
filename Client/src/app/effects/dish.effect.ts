import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {DishService} from '../services/dish.service';
import * as dishActions from '../actions/dish.action';

@Injectable()
export class DishEffects {

  constructor(
    private actions$: Actions,
    private dish: DishService
  ) {}

  @Effect()
  getPopular$ = this.actions$
    .ofType(dishActions.ActionTypes.GET_POPULAR)
    .map(action => action.payload)
    .switchMap(count => this.dish.getPopular(count)
      .map(result => new dishActions.GetPopularSuccessAction(result))
      .catch(error => Observable.of(new dishActions.GetPopularFail(error.message)))
    );

  @Effect()
  getByCategoryName$ = this.actions$
    .ofType(dishActions.ActionTypes.GET_BY_CATEGORY_NAME)
    .map(toPayload)
    .switchMap(category => this.dish.getByCategoryName(category)
      .map(result => new dishActions.GetDishesByCategoryNameSuccess(result))
      .catch(error => Observable.of(new dishActions.GetDishesByCategoryNameFail(error.message)))
    );
}
