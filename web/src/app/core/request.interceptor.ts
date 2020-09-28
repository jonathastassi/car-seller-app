import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.hasValue()) {
      const token = this.tokenService.getValue();
      const headers = request.headers.set('Authorization', `Bearer ${token}`);
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
