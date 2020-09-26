import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarFormComponent } from './car-form.component';

const routes: Routes = [
  {
    path: '',
    component: CarFormComponent,
    data: {
      title: 'Carros - Cadastro'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarFormRoutingModule { }
