import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarDetailRoutingModule } from './car-detail-routing.module';
import { BaseModule } from 'src/app/modules/base/base.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BaseModule,
    CarDetailRoutingModule
  ]
})
export class CarDetailModule { }
