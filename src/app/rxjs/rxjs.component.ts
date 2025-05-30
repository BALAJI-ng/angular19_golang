import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { response } from 'express';
import { resolve } from 'path';
import { from, fromEvent, interval, map, mapTo, Observable, of, timer, Subject, BehaviorSubject, ReplaySubject, AsyncSubject, combineLatest, take, combineLatestAll } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { clearInterval } from 'timers';

@Component({
  selector: 'app-rxjs',
  imports: [CommonModule],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss'
})
export class RxjsComponent {



  //Creation Operators
  //OF
  rxjsOF$: number[] = [];
  rxjsOF1$: any
  rxjsOFArrayObjectFunction$: any[] = [];

  //FROM
  rxjsFROM$: number[] = [];
  rxjsFROM1$: number[] = [];
  rxjsFROM2$: any[] = [];
  subscriptionValues: any[] = [];

  ngOnInit(): void {

    // const onesecondInterval$ = interval(1000);
    // const threesecondInterval$ = interval(5000);
    // combineLatest([onesecondInterval$, threesecondInterval$]).pipe(take(10)).subscribe(value => console.log("combine latest 1 and 3 seconds interval", value))

    // const higherOrderObservable$ = of(
    //   interval(1000).pipe(take(5)),
    //   interval(2000).pipe(take(5)),

    // )

    // higherOrderObservable$.pipe(combineLatestAll()).subscribe({
    //   next: values => console.log(values),
    //   complete: () => console.log("Completed")
    // })

    // //combineLatest
    // // const source1$ = timer(1000);
    // // const source2$ = timer(3000);
    // // combineLatest([source1$, source2$]).subscribe(([source1$, source2$]) => console.log(`Combine Latest source 1 - ${source1$}, Combine Latest source 2 ${source2$}`))



    // const source1$ = interval(1000); // Emits every 1 second
    // const source2$ = interval(1500); // Emits every 1.5 seconds

    // const combined$ = combineLatest([source1$, source2$]);

    // combined$.subscribe(([val1, val2]) => console.log(`Source1: ${val1}, Source2: ${val2}`));

    const source1$ = interval(1000);
    const source2$ = interval(5000);
    const combineLatest$ = combineLatest([source1$, source2$]);
    combineLatest$.subscribe(([source1$, source2$]) => `combineLatest S1 ${source1$} , S2 ${source2$}`)


    // const myObject = [{ name: "Balaji", age: 25 }, { name: "Suresh", age: 30 }, { name: "Ramesh", age: 35 }]
    // //retrive only name from object array
    // const source$ = from(myObject).pipe(map(value => value.name));
    // source$.subscribe(value => console.log("Retrieving Name", console.log(value)));


    // //Normal Subject
    // const mySubject$ = new Subject<string>();
    // mySubject$.subscribe((value) => console.log('Balaji subscribe', value));
    // mySubject$.next('Net Flix Movie 1');
    // mySubject$.next('Net Flix Movie 2');
    // mySubject$.next('Net Flix Movie 3');
    // mySubject$.subscribe((value) => console.log('Deepa subscribe', value));
    // mySubject$.next('Net Flix Movie 4');
    //Balaji Get all 4 movies because he subscribe at first
    //Deepa will get only 4th because after subscribe only one movie released
    // Balaji subscribe Net Flix Movie 1
    //  Balaji subscribe Net Flix Movie 2
    //  Balaji subscribe Net Flix Movie 3
    //  Balaji subscribe Net Flix Movie 4
    //  Deepa subscribe Net Flix Movie 4





    // Behaviour Subject - need initial value
    // same as subject also emit last movie & all new movies
    // const myBehaviourSubject$ = new BehaviorSubject('Dhill');
    // myBehaviourSubject$.subscribe((value) => console.log('Balaji subscribe', value));
    // myBehaviourSubject$.next('Net Flix Movie 1');
    // myBehaviourSubject$.next('Net Flix Movie 2');
    // myBehaviourSubject$.next('Net Flix Movie 3');
    // myBehaviourSubject$.subscribe((value) => console.log('Deepa subscribe', value));
    // myBehaviourSubject$.next('Net Flix Movie 4');

    // // Balaji subscribe Dhill
    // //  Balaji subscribe Net Flix Movie 1
    // //  Balaji subscribe Net Flix Movie 2
    // //  Balaji subscribe Net Flix Movie 3
    // //  Deepa subscribe Net Flix Movie 3
    // //  Balaji subscribe Net Flix Movie 4
    // //  Deepa subscribe Net Flix Movie 4

    // //Replay Subject - required how many old movies want
    // //Balaji will get all movies
    // //Deepa will get only last 2 movies + all new movies
    // const myReplaySubject$ = new ReplaySubject(2);
    // myReplaySubject$.subscribe((value) => console.log('Balaji subscribe', value));
    // myReplaySubject$.next('Net Flix Movie 1');
    // myReplaySubject$.next('Net Flix Movie 2');
    // myReplaySubject$.next('Net Flix Movie 3');
    // myReplaySubject$.subscribe((value) => console.log('Deepa subscribe', value));
    // myReplaySubject$.next('Net Flix Movie 4');

    // // Balaji subscribe Net Flix Movie 1
    // //  Balaji subscribe Net Flix Movie 2
    // //  Balaji subscribe Net Flix Movie 3
    // //  Deepa subscribe Net Flix Movie 2
    // //  Deepa subscribe Net Flix Movie 3
    // //  Balaji subscribe Net Flix Movie 4
    // //  Deepa subscribe Net Flix Movie 4

    // // //Async Subject - emit last values Balaji & Deepa only after completed
    // const myAsyncSubject$ = new AsyncSubject();
    // myAsyncSubject$.subscribe((value) => console.log('Balaji subscribe', value));
    // myAsyncSubject$.next('Net Flix Movie 1');
    // myAsyncSubject$.next('Net Flix Movie 2');
    // myAsyncSubject$.next('Net Flix Movie 3');
    // myAsyncSubject$.subscribe((value) => console.log('Deepa subscribe', value));
    // myAsyncSubject$.next('Net Flix Movie 4');
    // myAsyncSubject$.complete();

    // Balaji subscribe Net Flix Movie 4
    //  Deepa subscribe Net Flix Movie 4


    //user timer to emite

    // const mySourceTimer$ = interval(2000);
    // const myWordTrigger$ = mySourceTimer$.pipe(mapTo("Hello Balaji"));
    // myWordTrigger$.subscribe(value => console.log("myWordTrigger", value))


    //TRANSFORMATION OPERATORS
    //map -- used to transform the value of observable.
    //filter -- used to filter the value of observable.
    //tap -- used to perform side effect on observable.
    //mergeMap -- used to merge the value of observable.
    //switchMap -- used to switch the value of observable.
    //concatMap -- used to concat the value of observable.
    //combineLatest -- used to combine the latest value of observable.
    //forkJoin -- used to join the value of observable.
    //startWith -- used to start the value of observable.
    //endWith -- used to end the value of observable.
    //debounceTime -- used to debounce the value of observable.
    //distinctUntilChanged -- used to distinct the value of observable.
    //take -- used to take the value of observable.
    //takeUntil -- used to take the value of observable until the condition is met.
    //takeWhile -- used to take the value of observable while the condition is met.
    //skip -- used to skip the value of observable.
    //skipUntil -- used to skip the value of observable until the condition is met.
    //skipWhile -- used to skip the value of observable while the condition is met.
    //retry -- used to retry the value of observable.
    //retryWhen -- used to retry the value of observable when the condition is met.
    //retryWhen -- used to retry the value of observable when the condition is met.
    //catchError -- used to catch the error of observable.
    //finalize -- used to finalize the value of observable.

    // of(1, 2, 3, 4, 5).pipe(map((value) => value * 10)).subscribe(value => console.log("Multiply by 10", value))



    // //OF is a creation operator that creates an observable from a static value or array of values.
    // of(1, 2, 3, 4, 5).subscribe((val) => { this.rxjsOF$.push(val); });
    // //This will return only last value of the observable.
    // of("Hello", "World").subscribe((vale) => { this.rxjsOF1$ = vale });

    // //AOF - O convert Array object function to observable.
    // of([1, 2, 3, 4, 5], { name: "Balaji" }, function hello() { return 'Hello'; })
    //   .pipe(map((value) => value))
    //   .subscribe((val) => { this.rxjsOFArrayObjectFunction$.push(val); });






    // //FROM is a creation operator that creates an observable from an array, promise, or iterable.
    // from([1, 2, 3, 4, 5]).subscribe((val) => { this.rxjsFROM$.push(val); });


    // from([8888, 9999])
    //   .pipe(map((value) => value - 1000))
    //   .subscribe((val) => { this.rxjsFROM1$.push(val); });
    // console.log(this.rxjsFROM1$);

    // const source = from('Hello World');
    // //output: 'H','e','l','l','o',' ','W','o','r','l','d'
    // source.subscribe(val => this.subscriptionValues.push(val));
    // console.log(this.subscriptionValues);


    // //subscribe to the observable
    // //oninit subscribe
    // this.myObservable1.subscribe({
    //   next: (value: any) => { console.log(value); },
    //   error: (error: any) => { console.error(error); },
    //   complete: () => { console.log('Completed'); }
    // });

    // this.myHellowWorld$.subscribe(
    //   value => { console.log(value); });

    // //fromevent for promise
    // from(new Promise(resolve => resolve('Hello World'))).subscribe((val) => {
    //   console.log(val); // output: Hello World
    // });

    // //fromevent where user click
    // // fromEvent(+, 'click').pipe(map((event) => event.timeStamp)).subscribe((event) => {
    // //   console.log(event); // output: MouseEvent object
    // // })

    // //ajax request -- fromEventPattern -- convert event into observable.

    // // ajax(`https://api.github.com/users?per_page=2`).subscribe(res => console.log(res), err => console.log(err));


    // // Observable that emits even numbers on timer
    // const emittedEvenNumber$ = new Observable<number>((observer) => {
    //   let count = 0;
    //   const interval = setInterval(() => { if (count % 2 == 0) { observer.next(count) } count++ }, 1000)

    //   // return clearInterval(interval); // Cleanup function to clear the interval when unsubscribed

    // });



    // const stopSub = emittedEvenNumber$.subscribe((value) => {
    //   console.log(value)
    // });

    // // Unsubscribe from the observable to stop receiving values

    // setTimeout(() => stopSub.unsubscribe(), 10000); // This will stop the interval and prevent memory leaks


  }

  // // from -- used to convert to obeservable from Array, promise, iterable, etc.
  // //fromevent -- convert event into obeservab;e
  // //fromEvent -- convert event into observable.
  // //fromEventPattern -- convert event into observable



  // //oBSERVABLE -- ITS AND OBJECT EMIT VALUE ONE OR MORE OVER PERIOD OF TIME; IT WILL NOT EXECUTE UNTIL WE SUBSCRIBE

  // //BASIC USAGE -- its object send value overperiod of time
  // myObservable1 = new Observable<any>((observer) => {
  //   observer.next('Hello');
  //   observer.next('World');
  //   observer.complete();
  // });
  // myHellowWorld$ = from('Hello World');



}
