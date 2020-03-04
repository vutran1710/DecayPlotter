import { version, Component } from 'inferno'
import Logo from './logo'
import './App.css'

import Plotter from './Plotter'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Plotter />
      </div>
    )
  }
}

export default App
