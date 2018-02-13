import React from 'react';

export default class Chronometer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      startedSince: 0,
      startDate: new Date(),
      play: false,
    };

    this.tick = this.tick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  tick() {
    // Update the duration
    this.setState({ startedSince: new Date() - this.state.startDate });
  }

  start() {
    this.timerID = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.timerID);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleClick(e) {
    if (/Play|Pause/.test(e.target.value)) {
      !this.state.play ? this.start() : this.stop();
      this.setState({play: !this.state.play });
    }

    if (/Restart/.test(e.target.value)) {
      this.stop();
      this.setState({startDate: new Date() });
      this.setState({ play: true });
      this.start();
    }

  }

  render() {
    let hours = Math.floor(this.state.startedSince / 1000 / 3600),
        minutes = Math.floor(this.state.startedSince / 1000 / 60),
        seconds = Math.floor(this.state.startedSince / 1000 % 60);
    return (
      <div>
        <p>
          {[hours, minutes, seconds].map(t => t > 9 ? t : "0" + t).join(':')}
        </p>
        <div className="chronometer controls">
          <input type="button" className="button play" onClick={this.handleClick} value={this.state.play ? 'Pause' : 'Play'} />
          <input type="button" className="button restart" onClick={this.handleClick} value="Restart" />
        </div>
        <style jsx>{`
            p {
            text-align: center;
            font-size: 6.25vh;
            }

            .chronometer.controls {
              display: flex;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100vw;
              height: 16.18vh;
              justify-content: space-around;
              align-items: center;
              background: #FAFBFB;
              color:  #34A7E8;
            }

            .chronometer.controls input[type=button] {
              border: none;
              font-family: 'Questrial', sans-serif;
              background: #34A7E8;
              color: #FAFBFB;
              width: 60px;
              height: 60px;
              border-radius: 30px;

            }

          `}</style>
      </div>
    )

  }

}
