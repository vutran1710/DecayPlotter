import { Component } from 'inferno'
import * as F from './Functions'


export default class Plotter extends Component {
  state = {
    origin: 1000,
    elapsed: 1000,
    half_time: 10,
  }

  changeElapsed = e => this.setState({ elapsed: e.target.value })

  render() {
    const {
      origin,
      elapsed,
      half_time,
    } = this.state
    return (
      <div>
        <h2>This is plotter area</h2>
        <p>
          Ploitting data here
        </p>
        <h3>{F.decay(origin, elapsed, half_time)}</h3>
        <hr />
        <div>
          <title>Change elapsed time</title>
          <input
            name="elapsed"
            type="number"
            onInput={this.changeElapsed}
            value={elapsed}
          />
        </div>
      </div>
    )
  }
}
