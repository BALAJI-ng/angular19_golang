import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { audit, combineLatest, concat, debounce, debounceTime, delay, forkJoin, from, fromEvent, interval, map, mergeMap, of, pluck, Subject, switchMap, take, throttleTime, timer } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-rxjs-4',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rxjs-4.component.html',
  styleUrl: './rxjs-4.component.scss'
})
export class Rxjs4Component implements OnInit {
  first: FormControl<any> | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }
  myFform!: FormGroup;

  ngOnInit(): void {


    const myObj = [
      { id: 1, name: "Advika" },
      { id: 1, name: "Balaji" },
    ]

    //take only name
    from(myObj).pipe(map(value => value.name)).subscribe(x => console.log(`Retrievied only names ${x}`));


    ////map
    const Mappe = from([
      { name: 'Joe', age: 30, job: { title: 'Developer' } },
      { name: 'Sarah', age: 35 }
    ]);

    from(Mappe).pipe(map(value => value?.job?.title)).subscribe(x => console.log(`Good for option chaining to safely access ${x}`))
    from(Mappe).pipe(pluck('age')).subscribe(x => console.log(`not Good for option chaining to safely access ${x}`))


    //Mapto is depecriate - so use map -- on every click default value
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(document, 'click').pipe(map(() => "Balajiiiiiii"))
    }

    const mySubject = new Subject();
    mySubject.subscribe(x => console.log(`Balaji Subscribed movie ${x}`))
    mySubject.next("Mission Impossible Release")

    //combine latest -- wait for all obeservable to complet and emit indivial obersvable emit
    const timer1StartsAt1StSecondDelayFor4S$ = timer(1000, 4000);
    const timer2StartsAt2StSecondDelayFor4S$ = timer(2000, 4000);
    const timer3StartsAt3StSecondDelayFor4S$ = timer(3000, 4000);

    combineLatest([timer1StartsAt1StSecondDelayFor4S$, timer2StartsAt2StSecondDelayFor4S$,
      timer3StartsAt3StSecondDelayFor4S$
    ]).pipe(take(5)).subscribe(([v1, v2, v3]) => console.log(`Latest Values for Combine take 5 ${v1}, ${v2}, ${v3}`))

    //audit -- emit the last value
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(document, 'click').pipe(audit(() => interval(1000))).subscribe(x => console.log(`Audit is happening Appa ${x}`))
    }
    //audit -- delay - dnd - emit last value
    const myApiRequest$ = new Subject<string>();
    myApiRequest$.pipe(audit(() => (interval(5000)))).subscribe(x => console.log(`Audit - Checking ${x}`))
    myApiRequest$.next("Emitting A")
    myApiRequest$.next("Emitting B")
    myApiRequest$.next("Emitting C")
    myApiRequest$.next("Emitting D")
    myApiRequest$.next("Emitting E")
    //Emit only E

    // throttle time textbox search
    if (isPlatformBrowser(this.platformId)) {
      //Throttle Time
      const inputText = document.getElementById(
        'txtThrottleTime'
      ) as HTMLInputElement;
      const inputObs$ = fromEvent(inputText, 'input').pipe(
        throttleTime(5000), // limit text for 5 seconds emit the first enteretd value wait for 5 seconds
        //here we used Map to retriev the input value
        map(() => inputText.value)
      );

      inputObs$.subscribe((x => console.log(x)));
    }
    if (isPlatformBrowser(this.platformId)) {
      //Throttle Time - Button Clcik
      const userBtn = document.getElementById('btn') as HTMLButtonElement;
      const obs$ = fromEvent(userBtn, 'click').pipe(
        throttleTime(5000),
        map(() => userBtn.value)
      );

      obs$.subscribe((x) => console.log(`Clciked ${x}`));
    }


  }
  redirectNewPage() {
    this.router.navigateByUrl('/takeuntil')
  }






}
