import { useState } from 'react';
import initialData from './constants/initialData';

function App() {
  const width = 500;
  const height = 150;
  const padding = 20;
  const maxValue = 20;

  const [chartData, setChartData] = useState(initialData);

  const newData = () =>
    chartData.map(function (d) {
      d.value = Math.floor(Math.random() * (maxValue + 1));
      return d;
    });

  return (
    <div className='App'>
      <header className='App-header'>
        <svg id='chart' viewBox='0 0 500 150'>
          <path d='' fill='none' stroke='white' strokeWidth='5' />
        </svg>
        <p className='container'>
          <button type='button' onClick={() => setChartData(newData())}>
            Chart Data -- {JSON.stringify(chartData)}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
