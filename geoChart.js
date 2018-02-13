import React from 'react';
import Chart from 'chart.js';

export default class GeoChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      labels: props.data.map(d => d.label),
      data: props.data.map(d => d.data),
      width: props.width,
      height: props.height
    }

    console.log("Props : ", props.data);

  }

  componentDidMount() {

    this.chartInstance = new Chart(this.canvas, {
      type: this.state.type,
      data: {
        labels: this.state.labels,
        datasets: [{
          data: this.state.data,
          backgroundColor: "#023C40", 
          borderColor: "#0AD3FF",
          pointBackgroundColor: "#E1FAF9"
        }]
      }
    })

    console.log("Chart ok ! ");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      console.log("nextprops", nextProps);
      console.log("state from chart component", this.state.data);
      this.setState({ data: nextProps.data.map(e => e.data), labels: nextProps.data.map(e => e.label) });
      this.chartInstance.data.labels =  this.state.labels;
      this.chartInstance.data.datasets[0].data = this.state.data;
      this.chartInstance.update();

      console.log(this.state.data, this.state.labels);

    }

  }

  render() {
    return (
      <div>
        <canvas ref={(cvs) => { this.canvas = cvs; }} width={this.state.width} height={this.state.height}></canvas>
        <style jsx>{`
          div {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60vh;
          }
          canvas {
            height: 80%;

          }
       `}</style>
      </div>
      
    )
  }

}
