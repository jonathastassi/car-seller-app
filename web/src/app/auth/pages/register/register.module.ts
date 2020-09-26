import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { BaseModule } from 'src/app/modules/base/base.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    BaseModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
