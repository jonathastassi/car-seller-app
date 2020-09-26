import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { BaseModule } from '../../../modules/base/base.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    BaseModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
