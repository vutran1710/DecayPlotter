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
              <Button
                onClick={reset}
                disabled={disabled}
              >
                Reset!
              </Button>
            </Col>
            <Col>
              <Button
                primary
                onClick={formActions.animate}
              >
                Animate
              </Button>
            </Col>
            <Col>
              <Button
                primarya
                onClick={formActions.stopAnimate}
                color="danger"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                primarya
                onClick={formActions.addItem}
                color="primary"
              >
                Add Item
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}
