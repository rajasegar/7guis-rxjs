import Navigo from 'navigo';

import initCounterPage from './pages/counter.js';
import initTemperatureConverter from './pages/temperature-converter.js';
import initFlightBookerPage from './pages/flight-booker.js';
import initTimerPage from './pages/timer.js';


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
'crud': () => {
  renderTemplate('crud');
},
'circle-drawer': () => {
  renderTemplate('circle-drawer');
},
'cells': () => {
  renderTemplate('cells');
},
'*': () => {
  renderTemplate('home');
},

})
  .resolve();





