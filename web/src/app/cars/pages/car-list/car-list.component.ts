import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Observable, fromEvent, Subject, merge, BehaviorSubject, forkJoin, Subscription } from 'rxjs';
import { Car } from '../../models/car';
import { takeUntil, debounceTime, distinctUntilChanged, map, zip, combineAll, tap, concat } from 'rxjs/operators';
import { ArgumentsList } from 'src/app/shared/models/arguments-list';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnDestroy{

  cars: Car[] = [];

  subscription: Subscription;

  constructor(
    private carService: CarService
  ) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCars(page: number) {
    this.subscription = this.carService.list(new ArgumentsList(page))
      .subscribe(cars => {
        this.cars.push(...cars);
      })
  }

}
