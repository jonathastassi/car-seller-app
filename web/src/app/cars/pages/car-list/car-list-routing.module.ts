import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarListComponent } from './car-list.component';

const routes: Routes = [
  {
    path: '',
    component: CarListComponent,
    data: {
      title: 'Carros'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarListRoutingModule { }
