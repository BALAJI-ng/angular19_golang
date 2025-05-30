import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-take-until',
  imports: [],
  templateUrl: './take-until.component.html',
  styleUrl: './take-until.component.scss'
})
export class TakeUntilComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  ngOnInit(): void {
    interval(1000).pipe(takeUntil(this.destroy$)).subscribe(x => console.log(`I will emit until I destory ${x}`))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}
