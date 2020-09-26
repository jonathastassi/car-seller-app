import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, TemplateRef, ContentChild } from '@angular/core';
import { fromEvent, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-infinite-scroll',
  templateUrl: './list-infinite-scroll.component.html',
  styleUrls: ['./list-infinite-scroll.component.css']
})
export class ListInfiniteScrollComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Output() onScroll: EventEmitter<any> = new EventEmitter<any>(null);

  destroy = new Subject();
  destroy$ = this.destroy.asObservable();

  page: number = 0;
  pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  subscriptionPage: Subscription;
  subscriptionScroll: Subscription;

  @ContentChild('itemTemplate',{static: false}) ItemTemplateRef: TemplateRef<any>;

  constructor() {
    this.subscriptionScroll = fromEvent(window, 'scroll').pipe(takeUntil(this.destroy$))
      .subscribe((e: Event) => this.infiniteScroll(e));
  }

  ngOnInit(): void {
    this.subscriptionPage = this.pageSubject
    .pipe(
      debounceTime(250),
      distinctUntilChanged()
    )
    .subscribe((page: number) => {
      this.page++;
      this.onScroll.emit(this.page);
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.subscriptionPage.unsubscribe();
    this.subscriptionScroll.unsubscribe();
  }

  infiniteScroll(e: Event) {
    if ((document.documentElement.scrollTop + window.innerHeight) > (document.documentElement.scrollHeight - 700)) {
      this.pageSubject.next(this.page);
    }
  }

}
