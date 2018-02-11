import React from 'react'
import Chat from 'chart.js'
import GeoChart from './geoChart.js'

export default class Geolocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      speed: 0,
      altitude: 0,
      startDate: new Date(),
      startedSince: 0,
      chartData: [{ label: "Starting", data: 48.8}]
    }

  }

  componentDidMount() {
    if (navigator.geolocation) {
      console.log("START: starting tracking user location");
      navigator.geolocation.watchPosition((pos) => {
        console.log("SETUP TRACKING");
        return pos 
          ? this.setState({ coords: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                            speed: pos.coords.speed, 
                            altitude: pos.coords.altitude })
          : '';
      
      });
      console.log("STATE HYDRATED: ", this.state);

      // Time difference to display experiment duration
      this.timerID = setInterval(
        () => this.tick(),
        1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    // Update the duration
    this.setState({ startedSince: new Date() - this.state.startDate });

    // Update the chart
    if (this.state.chartData.length > 10) {
      let shiftAndRest = this.state.chartData.slice(1);
      this.setState({ chartData: [...shiftAndRest, {label: "altitude", data: this.state.coords.lat}]});
    } else {
      this.setState((prevState, _) => {
        chartData: prevState.chartData.push({ label: "altitude", data: this.state.coords.lat })
      });

      console.log("ChartData", this.state.chartData);
    }

  }

  render() {
    return (
      <div>
        <h1> SISISISILLY GEOLOCATOR!!!! </h1>
        <div className="geolocator-metrics"> 
          <p> Experiment duration:
          {Math.floor(this.state.startedSince / 1000 / 3600)} :
          {Math.floor(this.state.startedSince / 1000 / 60)} :
          {Math.floor(this.state.startedSince / 1000 % 60)}
          </p>
          <p> Pos: {this.state.coords.lat} | {this.state.coords.lng} </p>
          <p> Speed: {this.state.speed ? this.state.speed : 0}</p>
          <p> Altitude: {this.state.altitude ? this.state.altitude : 0}</p>
        </div>
        <div>
          <GeoChart type="line" data={this.state.chartData} width="600" height="500" />
        </div>
       <style jsx>{`
          h1 {
            text-align: center;
          }

          div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #C3979F;
            min-height: 50vh;
          }

          p {
            text-align: center;
            color: #023C40;
          }
        `}</style>
      </div>
    )
  }
}
