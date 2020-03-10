import { Component } from 'inferno'
import numeral from 'numeral'
import Chart from 'apexcharts'
import * as F from '../Functions'
import { Row, Col } from 'inferno-bootstrap'
import Header from './Header'
import RankingBoard from './RankingBoard'
import ControlBoard from './ControlBoard'
import Canvas from './Canvas'

const ORIGINAL_STATE = {
  S0: 10000,
  x: 0,
  D: 1.005,
}


export default class Plotter extends Component {
  CHART = undefined
  draw = undefined
  F = F.formula

  state = {
    ...ORIGINAL_STATE,
    disabled: false,
    values: [],
    items: [],
    animationSpeed: 80,
    blockLength: 2,
  }

  componentDidMount() {
    const ctx = document.getElementById("base")

    this.CHART = new Chart(ctx, {
      chart: {
        type: 'line',
      },
      series: [],
      xaxis: {
        min: 0,
        max: 1000,
      },
      yaxis: {
        min: 0,
        max: 12000,
      }
    })
    this.CHART.render()
  }

  formatNumber = v => numeral(v).format('0,0')

  modifyConfig = key => event => this.setState({ [key]: event.target.value })

  addItem = () => {
    const newItem = {
      x: this.state.x,
      y: this.state.S0,
      r: 0,
      id: Math.random().toString(36).substr(3, 5),
    }

    const items = [...this.state.items, newItem]

    this.CHART.appendSeries({
      name: newItem.id,
      data: [{
        x: this.state.x,
        y: newItem.y
      }],
    })

    this.setState({ items })
  }

  animate = () => {
    this.setState({ disabled: true })
    this.draw = setInterval(() => {
      const x = this.state.x + 1

      const {
        S0,
        D: steepness,
        blockLength,
      } = this.state
      const Smax = S0 * 1.2
      const items = this.state.items.map(item => ({
        x: item.x,
        y: Math.round(this.F(S0, x - item.x, item.r, steepness, Smax, blockLength), 1),
        r: item.r,
        id: item.id,
      }))

      const chartData = items.map(i => ({
        data: [{x, y: i.y}]
      }))

      this.CHART.appendData(chartData)

      this.setState({ x, items })
    }, this.state.animationSpeed)
  }

  stopAnimate = () => {
    window.clearInterval(this.draw)
    this.draw = undefined
    this.setState({ disabled: false })
  }

  boost = itemId => () => {
    const items = this.state.items
    const index = items.findIndex(item => item.id === itemId)
    items[index].r = items[index].r + 2
    this.setState({ items })
  }

  render() {
    const {
      x,
      D,
      S0,
      disabled,
      items,
      animationSpeed,
    } = this.state

    const {
      modifyConfig,
      reset,
      animate,
      stopAnimate,
      addItem,
      boost,
    } = this

    return (
      <div>
        <Header />
        <Row>
          <Col md="5">
            <Canvas />
          </Col>
          <Col md="2">
            <ControlBoard
              disabled={disabled}
              formValues={{x, D, S0, animationSpeed}}
              formActions={{ modifyConfig, reset, animate, stopAnimate, addItem }}
            />
          </Col>
          <Col md="5">
            <RankingBoard items={items} boost={boost} />
          </Col>
        </Row>
      </div>
    )
  }
}
