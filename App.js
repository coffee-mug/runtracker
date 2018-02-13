import React from 'react';
import Chronometer from './chronometer.js';
import GeoChart from './geoChart.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acceleration: {
        x: 0,
        y: 0,
        z: 0,
      },
      speed: {
        vx: 0,
        vy: 0,
        vz: 0
      },
    }
  }

  componentDidMount() {
    window.addEventListener('devicemotion', (e) => {
      // in m/s2 or meters per second, per second
      this.setState((prevState, props) => ({
        speed: { 
          vx: prevState.speed.vx + e.acceleration.x * (e.acceleration.x - this.state.acceleration.x),
          vy: prevState.speed.vy + e.acceleration.y * (e.acceleration.y - this.state.acceleration.y), 
          vz: prevState.speed.vz + e.acceleration.z * (e.acceleration.z - this.state.acceleration.z)
        }
      }));

      console.log(this.state.speed);

      this.setState({
       acceleration: {
          x: e.acceleration.x,
          y: e.acceleration.y,
          z: e.acceleration.z
        }
      })
    })
  }

  render() {
    return (
      <div>
        <Chronometer />
        <p> {Math.floor(Math.sqrt(Math.pow(this.state.speed.vx, 2)
                        + Math.pow(this.state.speed.vy, 2)
                        + Math.pow(this.state.speed.vz, 2)))} 
        </p>
      </div>
    )
  }
}
