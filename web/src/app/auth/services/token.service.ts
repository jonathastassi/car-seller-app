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

  getValue(): string {
    const token: string = localStorage.getItem(this.KEY_AUTH);
    return token;
  }

  removeValue(): void {
    localStorage.removeItem(this.KEY_AUTH);
  }

  hasValue(): boolean {
    return localStorage.getItem(this.KEY_AUTH) != null;
  }
}
