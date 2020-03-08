import { Component } from 'inferno'
import numeral from 'numeral'
import Chart from 'chart.js'
import * as F from './Functions'
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from 'inferno-bootstrap'
import Header from './components/Header'
import RankingBoard from './RankingBoard'
import ControlBoard from './ControlBoard'

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

  modifyConfig = key => event => this.setState({ [key]: event.target.value })

  addItem = () => {
    const items = this.state.items
    items.push({
      x: this.state.x,
      y: this.state.S0,
      r: 0
    })
    this.setState({ items })
  }

  animate = () => {
    this.draw = setInterval(() => {
      const x = this.state.x + 1
      this.setState({ x })
    }, 200)
  }

  stopAnimate = () => {
    window.clearInterval(this.draw)
    this.draw = undefined
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
    } = this

    return (
      <div>
        <Header />
        <Row>
          <Col>
            <Card>
              <CardBody className="bg-basic">
                <CardTitle>Real time charts</CardTitle>
                <CardText>
                  <Container>
                    <Row style={{ padding: 10 }}>
                      <canvas id="base" height="200" />
                    </Row>
                  </Container>
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <ControlBoard
              disabled={disabled}
              formValues={{x, D, S0}}
              formActions={{ modifyConfig, reset, animate, stopAnimate, addItem }}
            />
          </Col>
          <Col>
            <RankingBoard items={items} />
          </Col>
        </Row>
      </div>
    )
  }
}
