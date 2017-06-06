import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { DishesComponent } from './components/dishes/dishes.component';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: DishesComponent },
  { path: 'menu/:category', component: DishesComponent },
  { path: 'basket', component: BasketComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
