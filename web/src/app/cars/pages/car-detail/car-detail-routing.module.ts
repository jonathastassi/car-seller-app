import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailComponent } from './car-detail.component';

const routes: Routes = [
  {
    path: ':id',
    component: CarDetailComponent,
    data: {
      title: 'Carros'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarDetailRoutingModule { }
