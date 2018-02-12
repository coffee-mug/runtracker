import React from 'react'
import Chat from 'chart.js'
import GeoChart from './geoChart.js'

export default class Geolocator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {
        previous: { lat: 0, lng: 0 },
        current: { lat: 0, lng: 0 },
      },
      travelled: 0,
      acceleration: { x: 0, y: 0},
      speed: 0,
      altitude: 0,
      startDate: new Date(),
      startedSince: 0,
      chartData: [{ label: "Starting", data: 48.8}]
    }

    // Binding methods
    this.haversineDistance = this.haversineDistance.bind(this);
  }

  haversineDistance(lat1, lon1, lat2, lon2) {
    // https://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371e3; // metres
    var φ1 = lat1 * Math.PI / 180; // To radians
    var φ2 = lat2 * Math.PI / 180; // To radians
    var Δφ = (lat2-lat1) * Math.PI / 180;
    var Δλ = (lon2-lon1) * Math.PI / 180;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;

    // Distance in meters
    return d;
  }

  componentDidMount() {
    if (navigator.geolocation) {
      // Get user's position
      console.log("START: starting tracking user location");

      let previousCoords = this.state.coords.previous ? this.state.coords.previous : { lat: 0, lng: 0 };
      navigator.geolocation.watchPosition((pos) => {
        console.log("SETUP TRACKING");
        pos 
          ? this.setState({ coords: { current: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                                      previous: previousCoords },
                            speed: pos.coords.speed, 
                            altitude: pos.coords.altitude })
          : '';

        this.setState( (prevState, current) => { 
          travelled: prevState.travelled + 
                      this.haversineDistance(this.state.coords.previous.lat,
                                            this.state.coords.previous.lng,
                                            this.state.coords.current.lat,
                                            this.state.coords.current.lng)
        });
      
      });
      console.log("STATE HYDRATED: ", this.state);

      // Device Motion
      window.addEventListener('devicemotion', (e) => {
        console.log("Acceleration: ", e.acceleration.x, e.acceleration.y);
        this.setState({ acceleration: { x: e.acceleration.x, y: e.acceleration.y }});
      });

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
          <p> Acceleration: {this.state.acceleration.x} m/s2 | {this.state.acceleration.y} m/s2 </p>
          <p> Travelled: {this.state.travelled} </p>
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
