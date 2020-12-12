'use strict';

import { fromEvent } from 'rxjs';
import { scan, map  } from 'rxjs/operators';

export default function initCounterPage() {
  const btnIncrement = document.getElementById('btnCount');
  const txt = document.getElementById('txtCount');
  const increment$ = fromEvent(btnIncrement, 'click')
    .pipe(map(ev => +1))
    .pipe(scan((count)  => count + 1, 0))
    .subscribe(count => txt.value = count);
}
