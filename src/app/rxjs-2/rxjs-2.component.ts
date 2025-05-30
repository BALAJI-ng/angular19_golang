import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { audit, combineLatest, combineLatestAll, concatMap, debounce, delay, distinct, elementAt, exhaust, filter, flatMap, forkJoin, from, fromEvent, interval, map, mergeMap, of, take, takeWhile, throttleTime, timer } from 'rxjs';
import { partition } from 'rxjs';
@Component({
  selector: 'app-rxjs-2',
  imports: [],
  templateUrl: './rxjs-2.component.html',
  styleUrl: './rxjs-2.component.scss'
})
export class Rxjs2Component {

  //combine Latest
  // source1$ = timer(1000, 4000);
  // source2$ = timer(2000, 4000);
  // combinedLatest$ = combineLatest([this.source1$, this.source2$]).pipe(take(5));


  //combine latest All
  //works on higher order observable
  //ouetr observable must complete before 
  // higherOrderObservable$ = timer(0, 5000).pipe(
  //   take(3), // Emit 3 inner observables
  //   map(val => {
  //     const outerMessage = ` Outer Emitted ${val}`;
  //     return interval(1000).pipe(
  //       take(2),
  //       map(innerVal => ({ outerMessage, value: val, message: `Innerssss emitted: ${val}, inner: ${innerVal}` }))
  //     )
  //   }

  //   )
  // )

  //filter - Audit
  // emit the latest value if using timer 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }



  ngOnInit() {

    if (isPlatformBrowser(this.platformId)) {
      const div = document.createElement('div');
      div.style.cssText = 'width: 200px; height: 200px; background: #09c;';
      document.body.appendChild(div);

      const clicks = fromEvent(document, 'click');
      const clicksOnDivs = clicks.pipe(filter(ev => (<HTMLElement>ev.target).tagName === 'div'));
      clicksOnDivs.subscribe(x => console.log(x));
    }

    //elementAt
    if (isPlatformBrowser(this.platformId)) {
      const source11$ = fromEvent(document, 'click');
      source11$.pipe(elementAt(3)).subscribe(c => console.log(`User clicked 012 ${c}`))
    }
    const obj1 = { id: 3, name: 'name 1' };
    const obj2 = { id: 4, name: 'name 2' };
    const obj3 = { id: 3, name: 'name 3' };
    const val = [obj1, obj2, obj3]

    from(val).pipe(distinct(v => v.id)).subscribe(console.log)


    of(3, 3, 4, 5, 6, 7, 3, 3).pipe(takeWhile(x => x == 3)).subscribe(x => console.log(`Take while ${x}`));
    of(3, 3, 4, 5, 6, 7, 3, 3).pipe(filter(x => x === 3)).subscribe(x => console.log(`Filter ${x}`))

    //throttle time - sunn
    // const timer$ = interval(1000);
    // const throttleTime$ = timer$.pipe(throttleTime(5000))
    // throttleTime$.subscribe(value => console.log(`Throttle Time ${value}`))
    if (isPlatformBrowser(this.platformId)) {
      const throatTimeElem = document.getElementById('throatTime');
      if (throatTimeElem) {
        const throttleTimeText$ = fromEvent(throatTimeElem, 'input')
          .pipe(
            map(event => (event.target as HTMLInputElement).value),
            throttleTime(1000)

          );
        // You can use throttleTimeText$ here as needed
        throttleTimeText$.subscribe(value => console.log('Throttled Input:', value))
      }
    }


    if (isPlatformBrowser(this.platformId)) {
      const btn = document.getElementById('myBtn');
      if (btn) {
        fromEvent(btn, 'click')
          .pipe(audit(() => interval(5000)))
          .subscribe(event => {
            console.log('Filtered & Audited Click:', event);
          });
      }


    }


    //Audit
    // once source observable is recieved then lookf for timer -- ignore new value ; once time is completed then last value is recieved
    // const source$ = fromEvent(document, ' click')
    // const audit$ = source$.pipe(audit(() => interval(1000)))
    // audit$.subscribe(value => `audit Value ${value}`)
    //combined Latest
    // this.combinedLatest$.subscribe(([source1, source2]) => {
    //   console.log(` Combine Latest -- ${source1} , ${source2}`);
    // });

    //combineLatestAll
    // this.higherOrderObservable$.pipe(combineLatestAll()).subscribe(value => console.log("Combine Latest All", value))

    //all operator passing and see output function
    const passOperator = (parameter: any) => () => {
      from(["A", "B", "C"])
        .pipe(parameter((x: any) => of(x).pipe(delay(5000))))
        .subscribe(
          console.log,
          () => { },
          () => { `${parameter} is completed` }
        )
    }
    passOperator(mergeMap)()

  }

  //all operator passing and see output


}
