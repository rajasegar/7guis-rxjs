import { fromEvent, merge, interval } from 'rxjs';
import { scan, map, startWith, takeWhile } from 'rxjs/operators';

const btnIncrement = document.getElementById('btnCount');
const txt = document.getElementById('txtCount');
const increment$ = fromEvent(btnIncrement, 'click')
  .pipe(map(ev => +1))
  .pipe(scan((count)  => count + 1, 0))
  .subscribe(count => txt.value = count);

const txtCelcius = document.getElementById('txtCelcius');
const txtFah = document.getElementById('txtFah');

const celcius$ = fromEvent(txtCelcius, 'input')
  .pipe(map(ev => ev.target.value),
    startWith(1))
  .subscribe(c => {
    const f = c * (9/5) + 32;
    txtFah.value = Math.round(f);
  });
fromEvent(txtFah, 'input')
  .pipe(map(ev => ev.target.value), startWith(33.8))
  .subscribe(f => {
    const c = (f  - 32) * (5/9);
    txtCelcius.value = Math.round(c);
  });

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

let progress = 0;
const multiplier = 100;
const progressBar = document.querySelector('progress');
const duration$ = fromEvent(document.getElementById('sliderDuration'),'change')
  .pipe(map(ev => ev.target.value), startWith(5))
  .subscribe(duration => {
    //let progress = 0;
    const upperBound = duration * 1000;
    function updateProgress() {
      progressBar.setAttribute('max', upperBound);
      document.getElementById('duration').textContent = duration;
    }
    requestAnimationFrame(updateProgress);
    interval(multiplier)
      .pipe(takeWhile(() => progress <= upperBound))
      .subscribe(x => {
        progress += multiplier;
        progressBar.value = progress;
        function updateElapsed() {
          document.getElementById('elapsed').textContent = `${x/10} seconds`;
        }
        requestAnimationFrame(updateElapsed);
      });
  });
