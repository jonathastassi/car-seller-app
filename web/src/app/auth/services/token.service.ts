import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  readonly KEY_AUTH = "car_seller_app";

  constructor() { }

  setValue(token: string): void {
    localStorage.setItem(this.KEY_AUTH, token);
  }

  getValue(): void {
    localStorage.getItem(this.KEY_AUTH);
  }

  removeValue(): void {
    localStorage.removeItem(this.KEY_AUTH);
  }
}
