import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { environment } from '../../../environments/environment';
import { pluck, tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../../users/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private notification: NotificationService
  ) { }

  makeLogin(model: Login): Observable<string> {
    return this.http.post(environment.baseUrl + 'login', model)
      .pipe(
        pluck('accessToken'),
        tap((token: string) => {
          if (token) {
            this.userService.setUser(token);
          }
        }),
        catchError((err) => {
          this.notification.openSnackBar('Erro ao realizar login!', "Ok");
          return throwError(err);
        })
      )
  }

  makeRegister(model: Register): Observable<string> {
    return this.http.post(environment.baseUrl + 'register', model)
      .pipe(
        pluck('accessToken'),
        tap((token: string) => {
          if (token) {
            this.userService.setUser(token);
          }
        }),
        catchError((err) => {
          this.notification.openSnackBar('Erro ao registrar!', 'Ok');
          return throwError(err);
        })
      )
  }
}
