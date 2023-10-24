import { Component, Prop, h, Host, JSX } from '@stencil/core';
import { MatchResults } from '@stencil-community/router';
import {Chart} from "chart.js/auto"
@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  chartRef: HTMLCanvasElement
  chart: Chart
  data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  connectedCallback() {
    this.renderChart()
    console.log("Component connected");
  }
  componentDidRender() {
    this.renderChart()
    console.log('Component has been RENDERED');
  }
  disconnectedCallback() {
    this.chart?.destroy()
    console.log('Component has been disconnected');
  }
  renderChart() {
    if (this.chart) {
      this.chart.update()
    } else if (this.chartRef) {
      this.chart = new Chart(
        this.chartRef.getContext("2d"),
        {
          type: 'bar',
          data: {
            labels: this.data.map(row => row.year),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: this.data.map(row => row.count)
              }]
          },
        }
      );
      this.chart.render()
    }
  }
  render(): JSX.Element {
    return (
      <Host>
        <canvas id="canvas" ref={(elem) => this.chartRef = elem} />
      </Host >
    )
  }
}
