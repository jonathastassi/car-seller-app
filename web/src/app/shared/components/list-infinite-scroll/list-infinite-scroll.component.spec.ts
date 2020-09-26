import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInfiniteScrollComponent } from './list-infinite-scroll.component';

describe('ListInfiniteScrollComponent', () => {
  let component: ListInfiniteScrollComponent;
  let fixture: ComponentFixture<ListInfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInfiniteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
