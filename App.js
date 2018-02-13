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
      accelerationFlow: []
    }
  }

  componentDidMount() {
    try {
      window.addEventListener('devicemotion', (e) => {
        // in m/s2 or meters per second, per second
        this.accelerationSlice = this.state.accelerationFlow.slice(1, 9);
        this.accelerationSlice.push({
          label: "",
          data: e.acceleration.x,
        });

        this.setState({ accelerationFlow: this.accelerationSlice });
      })
    } catch(e) {
      console.warn("Metrics.js: devicemotion is not available on this device");
    }
  }

  render() {
    return (
      <div>
        <Chronometer />
        <GeoChart type="bar" width="80%" height="80%" data={this.state.accelerationFlow}/>
      </div>
    )
  }
}
