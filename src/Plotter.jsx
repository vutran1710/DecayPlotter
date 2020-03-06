import { Component } from 'inferno'
import numeral from 'numeral'
import Chart from 'chart.js'
import * as F from './Functions'
import {
  Input,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
} from 'inferno-bootstrap'
import Header from './components/Header'

const ORIGINAL_STATE = {
  origin: 10000,
  elapsed: 0,
  steep: 1.001,
}


export default class Plotter extends Component {
  CHART = undefined
  draw = undefined

  state = {
    ...ORIGINAL_STATE,
    disableInput: false,
    values: [],
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

    /* Chart.pluginService.register({
     *   beforeInit: function(chart) {
     *     const data = chart.config.data;
     *     for (let i = 0; i < data.datasets.length; i++) {
     *       for (let j = 0; j < data.labels.length; j++) {
     *         const fct = data.datasets[i].function
     *         const x = data.labels[j]
     *         const y = fct(x)
     *         data.datasets[i].data.push(y);
     *       }
     *     }
     *   }
     * }) */

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

  componentDidUpdate(prevProps, prevState) {
    const {
      values
    } = this.state
    /*     const labels = this.updateLabels(elapsed) */
    if (prevState.steep !== this.state.steep) {
      this.CHART.config.data.labels = []
      this.CHART.config.data.datasets[0].data = []
      this.updateChart([])
      this.setState({ values: [] })
    } else {
      this.updateChart(values)
    }
  }

  updateChart = values => {
    const currentLength = this.CHART.config.data.labels.length
    if (values.length === 0) return
    values.slice(currentLength).forEach(item => {
      this.CHART.config.data.labels.push(item.x)
      this.CHART.config.data.datasets[0].data.push(item.y)
    })
    this.CHART.update()
  }

  updateLabels = range => Array.from({ length: 11 }).fill(undefined).map((_, idx) => (range / 10) * idx)

  resetState = () => {
    this.setState(ORIGINAL_STATE)
    const orignalLabels = this.updateLabels(ORIGINAL_STATE.steep)
    this.updateChart(orignalLabels)
  }

  changeElapsed = e => this.setState({ elapsed: e.target.value })

  modifyConfig = key => event => this.setState({ [key]: event.target.value })

  animate = () => {
    this.setState({ disableInput: true })
    this.draw = setInterval(() => {
      const {
        values: stateValues,
        elapsed
      } = this.state
      const x = stateValues.length > 0 ? stateValues[this.state.values.length - 1].x + 1 : 1

      if (x > elapsed) {
        window.clearInterval(this.draw)
        this.draw = undefined
        return;
      }

      console.log('x =', x)
      const y = F.decay(this.state.origin, x, this.state.steep)
      const values = [...this.state.values, { x, y }]
      this.setState({ values })
    }, 20)
  }

  cancelAnimation = () => {
    window.clearInterval(this.draw)
    this.setState({ disableInput: false })
  }

  render() {
    const {
      origin,
      elapsed,
      steep,
      disableInput,
    } = this.state

    const result = numeral(F.decay(origin, elapsed,  steep)).format('0,0.0')

    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody className="bg-basic">
                  <CardTitle>Result (Nt) <span className="alert-result">{result}</span></CardTitle>
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
              <Card>
                <CardBody className="bg-basic">
                  <CardTitle>
                    Input values
                  </CardTitle>
                  <Form>
                    <Container>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="origin">Origin value (N0)</Label>
                            <Input
                              type="number"
                              name="origin"
                              value={origin}
                              onInput={this.modifyConfig('origin')}
                              disabled={disableInput}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="elapsed">Elapsed (t)</Label>
                            <Input
                              type="number"
                              name="elapsed"
                              value={elapsed}
                              onInput={this.modifyConfig('elapsed')}
                              step={steep/10}
                              min="0"
                              disabled={disableInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="half_decay">Decay-Constant (t)</Label>
                            <Input
                              type="number"
                              name="half_decay"
                              value={steep}
                              onInput={this.modifyConfig('steep')}
                              disabled={disableInput}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                  <hr />
                  <Row>
                    <Col>
                      <Button
                        onClick={this.resetState}
                        disabled={disableInput}
                      >
                        Reset!
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        primary
                        onClick={this.animate}
                        color="link"
                        disabled={disableInput || elapsed < 1.5 * steep}
                        link={disableInput || elapsed < 1.5 * steep}
                      >
                        Animate
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        primary
                        onClick={this.cancelAnimation}
                        color="danger"
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
