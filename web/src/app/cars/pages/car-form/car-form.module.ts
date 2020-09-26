import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarFormRoutingModule } from './car-form-routing.module';
import { CarFormComponent } from './car-form.component';


@NgModule({
  declarations: [CarFormComponent],
  imports: [
    CommonModule,
    CarFormRoutingModule
  ]
})
export class CarFormModule { }
