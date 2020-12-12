'use strict';

import { fromEvent, merge, interval } from 'rxjs';
import { scan, map, startWith, takeWhile } from 'rxjs/operators';

export default function initFlightBookerPage() {
const bookFlight$ = fromEvent(document.getElementById('btnBookFlight'),'click');
const from$ = fromEvent(document.getElementById('txtFrom'), 'input')
  .pipe(map(ev => ev.target.value));
const to$ = fromEvent(document.getElementById('txtTo'), 'input')
  .pipe(map(ev => ev.target.value));
const flight$ = fromEvent(document.getElementById('selFlight'), 'change')
  .pipe(map(ev => ev.target.value));

bookFlight$.subscribe((x) => {
  console.log(x);
  merge(from$,to$,flight$)
    .subscribe((from,to,flight) => console.log(from,to,flight));
});
}
