import { Component } from 'inferno'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Plotter from './components/Plotter'


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
