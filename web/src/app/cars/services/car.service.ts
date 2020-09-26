import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ArgumentsList } from '../../shared/models/arguments-list';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  readonly baseUrl: string = environment.baseUrl + 'cars';

  constructor(
    private http: HttpClient
  ) { }

  list(argument: ArgumentsList = null): Observable<Car[]> {

    if (!argument) {
      argument = new ArgumentsList();
    }

    const params = new HttpParams()
        .append('_page', argument.page.toString())
        .append('_limit', argument.limit.toString())
        .append('_expand', 'user');


    if (argument.q) {
      params.append('q', argument.q);
    }

    return this.http.get<Car[]>(this.baseUrl, { params });
  }
}
