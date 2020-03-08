import { Component } from 'inferno'
import numeral from 'numeral'
import Chart from 'chart.js'
import * as F from '../Functions'
import {
  Row,
  Col,
} from 'inferno-bootstrap'
import Header from './Header'
import RankingBoard from './RankingBoard'
import ControlBoard from './ControlBoard'
import Canvas from './Canvas'

const ORIGINAL_STATE = {
  S0: 10000,
  x: 0,
  D: 1.001,
}


export default class Plotter extends Component {
  CHART = undefined
  draw = undefined

  state = {
    ...ORIGINAL_STATE,
    disabled: false,
    values: [],
    items: [],
  }

  componentDidMount() {
    const ctx = document.getElementById("base");
    const data = {
      labels: [],
      datasets: [
        {
          label: "f(x) = x",
          borderColor: "rgba(75, 192, 192, 1)",
          data: [],
          fill: false
        },
      ]
    }

    this.CHART = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        animation: false,
        scales: {
          yAxes: [{
            ticks: {
              maxTicksLimit: 10,
              beginAtZero:true
            }
          }],
          xAxes: [{
            ticks: {
              callback: (value, index, values) => numeral(value).format('0')
            }
          }],
        }
      }
    })
  }

  formatNumber = v => numeral(v).format('0,0')

  modifyConfig = key => event => this.setState({ [key]: event.target.value })

  addItem = () => {
    const items = this.state.items
    items.push({
      x: this.state.x,
      y: this.state.S0,
      r: 0,
      id: Math.random().toString(36).substring(7),
    })
    this.setState({ items })
  }

  animate = () => {
    this.draw = setInterval(() => {
      const x = this.state.x + 1
      const items = this.state.items.map(item => ({
        x: item.x,
        y: this.formatNumber(F.S1T(this.state.S0, x - item.x, this.state.D)),
        r: item.r,
        id: item.id,
      }))

      this.setState({ x, items })
    }, 500)
  }

  stopAnimate = () => {
    window.clearInterval(this.draw)
    this.draw = undefined
  }

  boost = itemId => () => {
    const items = this.state.items
    const index = items.findIndex(item => item.id === itemId)
    items[index].r = items[index].r + 1
    this.setState({ items })
  }

  render() {
    const {
      x,
      D,
      S0,
      disabled,
      items,
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
              formValues={{x, D, S0}}
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
