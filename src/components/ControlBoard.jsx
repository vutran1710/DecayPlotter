import { Component } from 'inferno'
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ButtonGroup,
} from 'inferno-bootstrap'

export default class ControlBoard extends Component {

  render() {
    const {
      formValues,
      formActions,
      disabled,
      reset,
    } = this.props

    return (
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
                    <Label htmlFor="origin">Origin value (S0)</Label>
                    <Input
                      type="number"
                      name="origin"
                      value={formValues.S0}
                      onInput={formActions.modifyConfig('S0')}
                      disabled={disabled}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="elapsed">Elapsed (x)</Label>
                    <Input
                      type="number"
                      name="elapsed"
                      value={formValues.x}
                      onInput={formActions.modifyConfig('x')}
                      min="0"
                      disabled={disabled}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label htmlFor="steepness">Steepness (D)</Label>
                    <Input
                      type="number"
                      name="steepness"
                      value={formValues.D}
                      onInput={formActions.modifyConfig('D')}
                      disabled={disabled}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
          <hr />
          <Row>
            <Col>
              <ButtonGroup vertical>
                <Button size="lg" color="link" onClick={reset} disabled={true}>Reset</Button>
                <Button size="lg" color="link" onClick={formActions.animate}>Animate</Button>
                <Button size="lg" primary onClick={formActions.stopAnimate} color="link">Pause Animation</Button>
                <Button size="lg" primary onClick={formActions.addItem} color="link">Add Item</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}
