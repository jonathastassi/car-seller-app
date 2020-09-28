import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { environment } from '../../../environments/environment';
import { pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../../users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  makeLogin(model: Login): Observable<string> {
    return this.http.post(environment.baseUrl + 'login', model)
      .pipe(
        pluck('accessToken'),
        tap((token: string) => {
          if (token) {
            this.userService.setUser(token);
          }
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
        })
      )
  }
}
