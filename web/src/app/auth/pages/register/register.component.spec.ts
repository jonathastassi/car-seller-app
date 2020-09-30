import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InputFormComponent } from 'src/app/shared/components/input-form/input-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/register';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let authService: AuthService;

  let formValid: Register = {
    name: "Jonathas",
    email: "jonathas@hotmail.com",
    password: "123456",
  };

  let formInvalid: Register = {
    name: "Jonat",
    email: "jonathas.com",
    password: "1234"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, InputFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule.withRoutes([]), MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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
    component.form.get('confirmPassword').patchValue('123456');

    expect(component.form.invalid).toBeFalse();
  })

  it('Dado um form com dados inválidos, não permitir o submit', () => {
    component.form.patchValue(formInvalid);
    component.form.get('confirmPassword').patchValue('');

    expect(component.form.invalid).toBeTrue();
  })

  it('Dado um form válido, executar o submit', () => {
    spyOn(authService, 'makeRegister').and.returnValue(of('12345678910'));
    const navigationSpy = spyOn(router, 'navigateByUrl');

    component.form.patchValue(formValid);
    component.handleRegister();

    expect(navigationSpy).toHaveBeenCalledWith('cars/list');
  })

  it('Deve permanecer na página de registro em caso de erro', () => {
    spyOn(authService, 'makeRegister').and.returnValue(throwError("Bad Request"));
    const navigationSpy = spyOn(router, 'navigateByUrl');

    component.form.patchValue(formValid);
    component.handleRegister();

    expect(navigationSpy).not.toHaveBeenCalledWith('cars/list');
  })

  afterEach(() => {
    component.form.reset();
  })
});
