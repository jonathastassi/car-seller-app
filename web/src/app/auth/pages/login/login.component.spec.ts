import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { Login } from '../../models/login';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('A página de LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let authService: AuthService;

  let formValid: Login = {
    email: "jonathas@hotmail.com",
    password: "123456"
  };

  let formInvalid: Login = {
    email: "jonathas.com",
    password: "1234"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, InputFormComponent ],
      providers: [NotificationService],
      imports: [ReactiveFormsModule,  HttpClientTestingModule, RouterTestingModule.withRoutes([]), MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Dado um form com dados válidos, permitir o submit', () => {
    component.form.patchValue(formValid);
    expect(component.form.invalid).toBeFalse();
  })

  it('Dado um form com dados inválidos, não permitir o submit', () => {
    component.form.patchValue(formInvalid);
    expect(component.form.invalid).toBeTrue();
  })

  it('Dado um form válido, executar o submit', () => {
    spyOn(authService, 'makeLogin').and.returnValue(of('12345678910'));
    const navigationSpy = spyOn(router, 'navigateByUrl');

    component.form.patchValue(formValid);
    component.handleLogin();

    expect(navigationSpy).toHaveBeenCalledWith('cars/list');
  })

  it('Deve permanecer na página de login em caso de erro', () => {
    spyOn(authService, 'makeLogin').and.returnValue(throwError("Bad Request"));
    const navigationSpy = spyOn(router, 'navigateByUrl');

    component.form.patchValue(formValid);
    component.handleLogin();

    expect(navigationSpy).not.toHaveBeenCalledWith('cars/list');
  })

  afterEach(() => {
    component.form.reset();
  })
});
