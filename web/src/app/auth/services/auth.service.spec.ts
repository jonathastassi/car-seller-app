import { TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from 'src/app/users/services/user.service';
import { Login } from '../models/login';
import { of, throwError } from 'rxjs';
import { Register } from '../models/register';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('O serviço AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let userService: UserService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [UserService, NotificationService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    notificationService = TestBed.inject(NotificationService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve fazer login, retornando o token JWT', fakeAsync(() => {
    const model: Login = {email: 'jonathas@teste.com.br', password: '123456'};

    const fakeToken = '12345678910';
    const fakeResponse = {
      accessToken: fakeToken
    }

    const spy = spyOn(userService, "setUser").and.returnValue(null);

    service.makeLogin(model)
      .subscribe(
        response => {
          expect(response).toEqual(fakeToken);
          expect(spy).toHaveBeenCalledWith(fakeToken)
        }
      )

    const request = httpMock.expectOne(req => {
        return req.method === "POST";
    });

    request.flush(fakeResponse);

    tick();
  }));

  it('Quando der erro ao realizar login, exibir um alert', fakeAsync(() => {
    const model: Login = {email: 'jonathas@teste.com.br', password: '123456'};
    const spy = spyOn(notificationService, "openSnackBar").and.returnValue(null);


    service.makeLogin(model)
      .subscribe(
        response => fail('expect error, not success'),
        err => {
          expect(err.statusText).toBe('Bad Request');
          expect(spy).toHaveBeenCalledWith('Erro ao realizar login!', 'Ok');
        }
      )

    const request = httpMock.expectOne(req => {
        return req.method === "POST";
    });

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    request.flush(null, mockErrorResponse);

    tick();
  }));

  it('Deve fazer cadastrar um novo usuário, retornando o token JWT', fakeAsync(() => {
    const model: Register = {name: 'Jonathas Tassi', email: 'jonathas@teste.com.br', password: '123456'};

    const fakeToken = '12345678910';
    const fakeResponse = {
      accessToken: fakeToken
    }

    const spy = spyOn(userService, "setUser").and.returnValue(null);

    service.makeRegister(model)
      .subscribe(
        response => {
          expect(response).toEqual(fakeToken);
          expect(spy).toHaveBeenCalledWith(fakeToken)
        }
      )

    const request = httpMock.expectOne(req => {
        return req.method === "POST";
    });

    request.flush(fakeResponse);

    tick();
  }));

  it('Quando der erro ao realizar cadastro de usuário, exibir um alert', fakeAsync(() => {
    const model: Register = {name: 'Jonathas Tassi', email: 'jonathas@teste.com.br', password: '123456'};
    const spy = spyOn(notificationService, "openSnackBar").and.returnValue(null);


    service.makeRegister(model)
      .subscribe(
        response => fail('expect error, not success'),
        err => {
          expect(err.statusText).toBe('Bad Request');
          expect(spy).toHaveBeenCalledWith('Erro ao registrar!', 'Ok');
        }
      )

    const request = httpMock.expectOne(req => {
        return req.method === "POST";
    });

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };

    request.flush(null, mockErrorResponse);

    tick();
  }));
});
