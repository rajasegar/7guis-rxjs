import { fromEvent, merge, interval } from 'rxjs';
import { scan, map, startWith, takeWhile } from 'rxjs/operators';
import Navigo from 'navigo';

import initCounterPage from './pages/counter';
import initTemperatureConverter from './pages/temperature-converter';


function renderTemplate(route) {
  outlet.innerHTML = '';
  const templateId = `#template-${route}`;
  const template = document.querySelector(templateId);
  const clone = template.content.cloneNode(true);
  outlet.appendChild(clone);
}

const router = new Navigo("/");
const outlet = document.getElementById('outlet');
router.on({
'counter': () => {
  renderTemplate('counter');
  initCounterPage();
},
'timer': () => {
  renderTemplate('timer');
  initTimerPage();
},
'temperature-converter': () => {
  renderTemplate('temperature-converter');
  initTemperatureConverter();
},
'flight-booker': () => {
  renderTemplate('flight-booker');
  initFlightBookerPage();
},
'*': () => {
  renderTemplate('home');
},

})
  .resolve();




function initFlightBookerPage() {
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

function initTimerPage() {
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
}
