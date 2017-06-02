import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { DishesComponent } from './components/dishes/dishes.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: DishesComponent },
  { path: 'menu/:category', component: DishesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
