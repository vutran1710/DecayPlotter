import { Component } from 'inferno'
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Row,
} from 'inferno-bootstrap'

export default class Canvas extends Component {
  state = {

  }
  render() {
    return (
      <Card>
        <CardBody className="bg-basic">
          <CardTitle>Real time charts</CardTitle>
          <CardText>
            <Container>
              <Row style={{ padding: 10 }}>
                <div id="base" height="200" />
              </Row>
            </Container>
          </CardText>
        </CardBody>
      </Card>
    )
  }
}
