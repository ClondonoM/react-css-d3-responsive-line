import { useEffect, useRef, useState } from 'react';
import initialData from './constants/initialData';
import * as d3 from 'd3';

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

  const svgRef = useRef();

  useEffect(() => {
    return () => {
      const xScale = d3
        .scalePoint()
        .domain(chartData.map((d) => d.name))
        .range([0 + padding, width - padding]);
      console.log('Start - End', xScale('Car'), xScale('Cinema'));

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(chartData, function (d) {
            return d.value;
          }),
        ])
        .range([height - padding, 0 + padding]);

      console.log('Start - End', yScale(0), yScale(10));

      const line = d3
        .line()
        .x((d) => xScale(d.name))
        .y((d) => yScale(d.value))
        .curve(d3.curveMonotoneX);

      console.log('chart draw commands', line(chartData));

      d3.select(svgRef.current)
        .select('path')
        .attr('d', (value) => line(chartData))
        .attr('fill', 'none')
        .attr('stroke', 'white');

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      d3.select('#xaxxis').remove();
      d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(0,${height - padding})`)
        .attr('id', 'xaxxis')
        .call(xAxis);

      d3.select('#yaxxis').remove();
      d3.select(svgRef.current)
        .append('g')
        .attr('transform', `translate(${padding},0)`)
        .attr('id', 'yaxxis')
        .call(yAxis);
    };
  }, [chartData]);

  return (
    <div className='App'>
      <header className='App-header'>
        <svg id='chart' ref={svgRef} viewBox='0 0 500 150'>
          <path d='' fill='none' stroke='white' strokeWidth='5' />
        </svg>
        <p className='container'>
          <button type='button' onClick={() => setChartData(newData())}>
            Change Chart Data
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
