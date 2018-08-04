import { asyncFib } from '../fib_functions/async.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async.js';
import { post } from '../utils/fetch.js';
import { hyphenize, snakeCaseize } from '../utils/convert_string.js';

export default function(type) {
  return function(e) {
    e.preventDefault();

    const button = document.getElementById(`${hyphenize(type)}-submit`);
    button.disabled = true;

    const n = parseInt(document.getElementById(`${hyphenize(type)}-n`).value);
    const resultDiv = document.getElementById(`${hyphenize(type)}-result`);
    const timeDiv = document.getElementById(`${hyphenize(type)}-time`);

    let worker;
    if (window.Worker) {
      worker = new Worker('./workers/async.js');
      const beforeTime = new Date().getTime();
      worker.postMessage({ n });
      worker.onmessage = function(e) {
        const afterTime = new Date().getTime();
        const duration = afterTime - beforeTime;
        displayResult(n, button, duration, resultDiv, timeDiv, e.data.n);
        worker.terminate();
        post(`${snakeCaseize(type)}`, n, duration);
      };
    } else {
      const beforeTime = new Date().getTime();
      eval(`type${Fib}`)(n).then(function(result) {
        const afterTime = new Date().getTime();
        const duration = afterTime - beforeTime;
        displayResult(n, button, duration, resultDiv, timeDiv, result);
        post(`${snakeCaseize(type)}`, n, duration);
      });
    }
  };
}
