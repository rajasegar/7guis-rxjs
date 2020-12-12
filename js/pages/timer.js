'use strict';

import { fromEvent, merge, interval } from 'rxjs';
import { scan, map, startWith, takeWhile } from 'rxjs/operators';

export default function initTimerPage() {
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
