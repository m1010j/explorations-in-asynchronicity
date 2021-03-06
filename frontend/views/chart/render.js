import setUpChart from './set_up.js';

export default function(
  main,
  chartContainerContainer,
  resultsButton,
  benchmarksButton
) {
  const hash = window.location.hash.slice(1);
  if (hash === 'results') {
    if (!window.chartIsSetUp) {
      setUpChart();
      window.chartIsSetUp = true;
    }
    renderResults(
      main,
      chartContainerContainer,
      resultsButton,
      benchmarksButton
    );
  } else if (hash === 'benchmarks') {
    renderBenchmarks(
      main,
      chartContainerContainer,
      resultsButton,
      benchmarksButton
    );
  }
}

function renderResults(
  main,
  chartContainerContainer,
  resultsButton,
  benchmarksButton
) {
  main.style.display = 'none';
  chartContainerContainer.style.display = 'flex';
  resultsButton.classList.add('bold');
  benchmarksButton.classList.remove('bold');
}

function renderBenchmarks(
  main,
  chartContainerContainer,
  resultsButton,
  benchmarksButton
) {
  chartContainerContainer.style.display = 'none';
  main.style.display = 'flex';
  benchmarksButton.classList.add('bold');
  resultsButton.classList.remove('bold');
}
