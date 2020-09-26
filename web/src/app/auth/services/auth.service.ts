import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { environment } from '../../../environments/environment';
import { pluck, tap } from 'rxjs/operators';
import { TokenService } from '../../auth/services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  makeLogin(model: Login): Observable<string> {
    return this.http.post(environment.baseUrl + 'login', model)
      .pipe(
        pluck('accessToken'),
        tap((token: string) => {
          if (token) {
            this.tokenService.setValue(token);
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
            this.tokenService.setValue(token);
          }
        })
      )
  }
}
