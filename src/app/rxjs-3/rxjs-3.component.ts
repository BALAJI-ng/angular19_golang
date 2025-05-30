import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { count, delay, from, fromEvent, interval, map, max, of, range, reduce, takeUntil, timer, concatMap, take, mergeMap, exhaustMap, switchMap, concatMapTo, expand, groupBy, toArray, mapTo, scan, partition, empty, Subject, BehaviorSubject, takeWhile, buffer, bufferToggle } from 'rxjs';

@Component({
  selector: 'app-rxjs-3',
  imports: [],
  templateUrl: './rxjs-3.component.html',
  styleUrl: './rxjs-3.component.scss'
})
export class Rxjs3Component implements OnInit {

  //count howmany number odd number between 0 to 9
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  ngOnInit(): void {
    const rangeNumber$ = range(0, 9)
    const count$ = rangeNumber$.pipe(count(x => x % 2 === 1));
    count$.subscribe(x => console.log(`Number of odd numbet between 0 to 9 is ${x}`));

    if (isPlatformBrowser(this.platformId)) {
      // Counts how many seconds have passed before the first click happened;
      const click$ = fromEvent(document, 'click');
      const seconds$ = interval(1000);
      const countClick = seconds$.pipe(takeUntil(click$))
      countClick.pipe(count()).subscribe(x => console.log(`He took this much time  ${x} to first click`))
    }

    //find max number
    of(1, 2, 3, 4, 66, 77, 88).pipe(max()).subscribe(x => console.log(`max number is ${x}`))

    //find costly alcohol
    const barMenu = [
      { cost: 30, name: "whiskey" },
      { cost: 40, name: "Rum" },
      { cost: 50, name: "Wine" }
    ]

    const formulaToFindMaxValue$ = from(barMenu).pipe(max((a, b) => a.cost < b.cost ? -1 : 1))
    formulaToFindMaxValue$.subscribe(x => console.log(`max cost menu ion this bar is ${JSON.stringify(x)}`))

    of(1, 2, 3, 4, 5).pipe(reduce((acc, val) => acc + val, 0)).subscribe(x => console.log(`reduce accumate value is ${x}`))

    //Count the number of click events that happened in 5 seconds
    if (isPlatformBrowser(this.platformId)) {

      const clicksinFiveSeconds$ = fromEvent(document, 'click').pipe(takeUntil(interval(5000)));
      const ones$ = clicksinFiveSeconds$.pipe(map(() => 1))
      ones$.pipe(reduce((acc, val) => acc + val, 0)).subscribe(x => console.log(`He click this much ${x} in 5 seconds `))
    }

    //concateMap

    const source$ = of(1, 2, 3, 4, 5);
    const delayThreeSeconds$ = delay(3000);

    source$.pipe(concatMap(v => of(v).pipe(delay(3000))), take(4)).subscribe(x => console.log(`concateMap delayed by 3 seconds ${x}`))
    source$.pipe(mergeMap(v => of(v).pipe(delay(5000))), take(4)).subscribe(x => console.log(`Merge Map delayed by 3 seconds ${x}`))
    source$.pipe(exhaustMap(v => of(v).pipe(delay(3000))), take(4)).subscribe(x => console.log(`Exhaust map delayed by 3 seconds ${x}`))
    source$.pipe(switchMap(v => of(v).pipe(delay(3000))), take(4)).subscribe(x => console.log(`Switch map delayed by 3 seconds ${x}`))
    source$.pipe(expand(v => of(v + 10000)), take(4)).subscribe(x => console.log(`Expand map delayed by 3 seconds ${x}`))

    //Group By
    const sourceGrouBy = [
      { id: 1, name: "Javascript" },
      { id: 2, name: "TypeScript" },
      { id: 1, name: "JS" },
      { id: 2, name: "TS" },
      { id: 3, name: "FrontEnd" }
    ]


    from(sourceGrouBy)
      .pipe(

        groupBy(val => val.id),

        mergeMap(val => val.pipe(toArray()))

      ).subscribe(x => console.log(`Group By values ${JSON.stringify(x)}`))


    of(
      { id: 1, name: 'JavaScript' },
      { id: 2, name: 'Parcel' },
      { id: 2, name: 'webpack' },
      { id: 1, name: 'TypeScript' },
      { id: 3, name: 'TSLint' }
    ).pipe(
      groupBy(value => value.id, { element: value => value.name }),
      mergeMap(group$ => group$.pipe(reduce((acc, cur) => [...acc, cur], [`${group$.key}`]))),
      map(arr => ({ id: parseInt(arr[0], 10), values: arr.slice(1) }))
    )
      .subscribe(p => console.log(`Group By 11`, p));

    //   groupBy(value => value.id, value => value.name),
    // Group By 11 { id: 1, values: [ 'JavaScript', 'TypeScript' ] }
    // Group By 11 { id: 2, values: [ 'Parcel', 'webpack' ] }
    // Group By 11 { id: 3, values: [ 'TSLint' ] }

    from(sourceGrouBy).pipe(
      groupBy(value => value.id, { element: value => value.name }),
      mergeMap(value => value.pipe(reduce((acc, cur) => [...acc, cur], [`${value.key}`]))),
      map(value => ({ id: parseInt(value[0], 10), values: value.slice(1) }))).subscribe(x => console.log("Group By Result Demo", x))


    //mapTo
    if (isPlatformBrowser(this.platformId)) {
      const sourceMapto$ = fromEvent(document, 'click');
      const emit$ = "Balaji"
      sourceMapto$.pipe(mapTo(emit$)).subscribe(x => console.log(`Hi Balaji Deepa ${x}`))
    }

    //a0, b0,c0, a1,b1, c1
    of('a', 'b', 'c').pipe(
      switchMap(outer => interval(1000).pipe(map(inner => outer + inner))), take(5)).subscribe(x => console.log("Mergemap", x))


    const sourceScan1$ = of(1, 2, 3, 4, 5);

    sourceScan1$.pipe(
      scan((acc, val) => acc + val, 0) // Accumulate sum
    ).subscribe(x => console.log(`Scan shows intermediate result ${x}`));

    sourceScan1$.pipe(
      reduce((acc, val) => acc + val, 0) // Accumulate sum
    ).subscribe(x => console.log(`Reducer shows final result ${x}`));


    //switchmap -- last last emitted value
    const switchMapSource$ = of('a', 'b', 'c')
    const seconds1$ = interval(1000).pipe(take(5))


    const myRange$ = of(0, 1, 2, 3, 4, 5, 6)
    const [odd$, even$] = partition(myRange$, value => value % 2 == 1)
    odd$.subscribe(x => console.log(`My Odd Numbers ${x}`))

    interval(2000).pipe(mapTo("show 4Balaji"), take(4)).subscribe(x => console.log(`${x}`))

    const normalSubject = new BehaviorSubject<string | undefined>("Dhool");
    normalSubject.subscribe(x => console.log(`Balaji normal Subject ${x}`))
    normalSubject.next("Billa Balaji")
    normalSubject.subscribe(x => console.log(`Deepa normal Subject ${x}`))
    normalSubject.next("Jiutha Balaji")


    //CONCAT MAP
    const concatMapSource$ = of('a', 'b', 'c')
    const seconds$ = interval(1000).pipe(take(5))
    concatMapSource$.pipe(mergeMap(outer => seconds$.pipe(map(inner => outer + inner)))).subscribe(x => console.log(`Result of concat Map ${x}`))

    const someFunction = (parameter: any) => () => {

      from(["A", "B", "C", "D"])
        .pipe(parameter((x: any) => of(x).pipe(delay(5000))))
        .subscribe(x => console.log(`concatMap1 Result Balaji ${x}`))

    }

    someFunction(concatMap)();

    //take while vs take until
    //take While -- based on condition is true stop emitting
    //Take Until -- wait for another obersavle to siganal and stop

    const sourceTakeWhile$ = of(1, 2, 3, 4, 5, 6)
    const operation$ = sourceTakeWhile$.pipe(takeWhile(value => value < 4))
    operation$.subscribe(x => console.log(`Take Whil vayal stops once condition is met ${x}`))

    // if (isPlatformBrowser(this.platformId)) {
    //   const click$ = fromEvent(document, 'click');
    //   const seconds$ = interval(1000).pipe(takeUntil(click$))

    //   seconds$.subscribe(x => console.log(`Seconds stops ${x}`))
    // }

    //scan --doctor keeps you updated

    const sourceScan$ = of(1, 2, 3, 4, 5, 6)
    const operationScanSpecialMariathai$ = sourceScan$.pipe(scan((a, b) => a + b, 0))
    operationScanSpecialMariathai$.subscribe(x => console.log(`operationScanSpecialMariathai intermidate result ${x}`))

    //reduce -- adikaratha addithideu final oru value

    const sourceReduce$ = of(1, 2, 3, 4, 5, 6)
    const operationReduce$ = sourceReduce$.pipe(reduce((a, b) => a - b, 0))
    operationReduce$.subscribe(x => console.log(`Reduce ku special mariathai -- emit after all summed up ${x}`))


    //want output like a0,b0,c0, a1,b1,c3
    //nee vanthu renu merge panu

    //merge map

    of(1, 2, 3, 4, 5, 6).pipe(switchMap(value => of(value).pipe(delay(1000)))).subscribe(x => console.log(`Swithc Map${x}`))

    //group By
    const myG = [
      { id: 1, name: "Advika" },
      { id: 2, name: "Balaji" },
      { id: 1, name: "Advika Balaji" },
      { id: 2, name: "Deepa Balaji" },
      { id: 3, name: "Deepa" }
    ]
    from(myG).pipe(groupBy(value => value.id, { element: value => value.name }))
      .subscribe(x => console.log(`WHat it does 111 ${JSON.stringify(x)}`), group => group.subscribe((val: any) => console.log("WHat it does 222", val)))

    //output
    //convert to array 

    from(myG).pipe(
      groupBy(value => value.id, { element: value => value.name }),
      mergeMap(value => value.pipe(toArray()))
      // mergeMap(value => value.pipe(reduce((acc, cur) => [...acc, cur], [`${value.key}`]))),
      // map(value => ({ id: parseInt(value[0], 10), values: value.slice(1) }))
    )
      .subscribe(x => console.log("Group By toarray", x))


    from(sourceGrouBy)
      .pipe(

        groupBy(val => val.id),

        mergeMap(val => val.pipe(toArray()))

      ).subscribe(x => console.log(`Group By values ${JSON.stringify(x)}`))



    from(myG).pipe(
      groupBy(value => value.id, { element: value => value.name }),
      //  Group By values [{"id":1,"name":"Javascript"},{"id":1,"name":"JS"}]
      // Group By values [{"id":2,"name":"TypeScript"},{"id":2,"name":"TS"}]
      // Group By values [{"id":3,"name":"FrontEnd"}]
      mergeMap(value => value.pipe(reduce((a, b) => [...a, b], [`${value.key}`]))),
      //What Balaji ["1","Advika","Advika Balaji"]
      // What Balaji ["2","Balaji","Deepa Balaji"]
      // What Balaji ["3","Deepa"]
      map(value => ({ idssssss: parseInt(value[0], 10), anythingsss: value.slice(1) }))
    ).subscribe(x => console.log(`What Balaji ${JSON.stringify(x)}`))

    // 

    from(sourceGrouBy).pipe(
      groupBy(value => value.id, { element: value => value.name }),
      mergeMap(value => value.pipe(reduce((acc, cur) => [...acc, cur], [`${value.key}`]))),
      map(value => ({ id: parseInt(value[0], 10), values: value.slice(1) }))).subscribe(x => console.log("Group By Result Demo", x))



    //expand
    // of(1, 2, 3, 4, 5).pipe(expand(value => of(value + 1))).subscribe(x => console.log(`what expand does? ${x}`))

    if (isPlatformBrowser(this.platformId)) {

      //emit seonds evry 1 seconds
      const bufferSource$ = interval(1000);

      //click
      const clickBuffer$ = fromEvent(document, 'click');

      //use buffer
      bufferSource$.pipe(buffer(clickBuffer$)).subscribe(x => console.log("emitttt bbbuuffer", x))


    }

    //buffer togle -- open close open close
    of(interval(1000)).pipe(bufferToggle(interval(2000), () => interval(3000)), take(5)).subscribe(x => console.log("Buffer Start 2s and end 3s", x))

  }





}









