import { Component } from 'inferno'
import numeral from 'numeral'
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
} from 'inferno-bootstrap'
import Header from './components/Header'


export default class Plotter extends Component {
  state = {
    origin: 1000,
    elapsed: 0,
    decay_constant: 3600,
  }

  changeElapsed = e => this.setState({ elapsed: e.target.value })

  modifyConfig = key => event => this.setState({ [key]: event.target.value })

  render() {
    const {
      origin,
      elapsed,
       decay_constant,
    } = this.state

    const result = numeral(F.decay(origin, elapsed,  decay_constant)).format('0,0.000')

    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col>
              <Card>
                <CardBody className="bg-basic">
                  <CardTitle>Nt Result</CardTitle>
                  <CardText>
                    <h4>{result}</h4>
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
                    <FormGroup>
                      <Label htmlFor="origin">Origin value (N0)</Label>
                      <Input type="number" name="origin" value={origin} onInput={this.modifyConfig('origin')} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="elapsed">Elapsed (t)</Label>
                      <Input type="number" name="elapsed" value={elapsed} onInput={this.modifyConfig('elapsed')} />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="half_decay">Decay-Constant (t)</Label>
                      <Input type="number" name="half_decay" value={decay_constant} onInput={this.modifyConfig(' decay_constant')} />
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
