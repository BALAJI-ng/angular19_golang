import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from './../../../src/app/store/counter.reducer';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ng-rxredux-store',
  imports: [CommonModule],
  templateUrl: './ng-rxredux-store.component.html',
  styleUrl: './ng-rxredux-store.component.scss'
})
export class NgRxreduxStoreComponent implements OnInit {

  counter$: Observable<number>;

  constructor(private store: Store<{ counter: number }>) {
    this.counter$ = store.select('counter');
    this.store.subscribe(state => {
      console.log('Current store state:', state);
    });
  }

  ngOnInit(): void {
    console.log("Redux stored Balaji", this.store.select(state => state))
  }

  increase() {
    this.store.dispatch(increment());
  }

  decrease() {
    this.store.dispatch(decrement());
  }

  resetCounter() {
    this.store.dispatch(reset());
  }


}
