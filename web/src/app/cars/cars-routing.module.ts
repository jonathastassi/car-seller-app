import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () => import('./pages/car-form/car-form.module').then(m => m.CarFormModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/car-list/car-list.module').then(m => m.CarListModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./pages/car-detail/car-detail.module').then(m => m.CarDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
