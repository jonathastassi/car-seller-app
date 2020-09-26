import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarListRoutingModule } from './car-list-routing.module';
import { CarListComponent } from './car-list.component';
import { BaseModule } from 'src/app/modules/base/base.module';


@NgModule({
  declarations: [CarListComponent],
  imports: [
    CommonModule,
    BaseModule,
    CarListRoutingModule
  ]
})
export class CarListModule { }
