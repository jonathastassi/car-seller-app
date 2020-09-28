import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { TokenService } from 'src/app/auth/services/token.service';
import jwt_decode from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl: string = environment.baseUrl + 'users/';

  private userSubject = new BehaviorSubject<User>(null);

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {
    this.tokenService.hasValue() && this.getDataUser();
  }

  setUser(token: string) {
    this.tokenService.setValue(token);
    this.getDataUser();
  }

  private getDataUser(): void {
    const token = this.tokenService.getValue();
    const user_id = jwt_decode(token)['sub'];

    if (user_id) {
      this.getById(user_id)
        .subscribe(
          x => {
            this.userSubject.next(x);
          }
        )
    }
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl+id)
      .pipe(
        map(
          x => {
            x.password = null;
            return x;
          }
        )
      );
  }

  isLogged() {
    return this.tokenService.hasValue();
  }

  logout() {
    this.tokenService.removeValue();
    this.userSubject.next(null);
  }
}
