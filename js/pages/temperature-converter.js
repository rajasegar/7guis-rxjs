'use strict';

import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export default function initTemperatureConverter() {
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
}
