import { Component } from 'inferno'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'inferno-bootstrap'
import cx from 'classnames'

const setBg = idx => cx(
  'white',
  'mb2',
  'p1',
  {
    'bg-danger': idx % 2 !== 0,
    'bg-dark': idx % 2 === 0,
  }
)

export default class RankingBoard extends Component {

  render() {
    const { items, boost } = this.props

    if (!items || items.length === 0) {
      return (
        <div>
          <Card>
            <CardBody>
              <CardTitle>Empty</CardTitle>
              <CardText>Run and add some items to see changes</CardText>
            </CardBody>
          </Card>
        </div>
      )
    }

    return (
      <div>
        {items.sort((a,b) => a.y > b.y ? -1 : 1).map((item, idx) => (
          <Card className={setBg(idx)}>
            <CardBody>
              <Row>
                <Col><h4>#{idx}</h4></Col>
                <Col>T0: {item.x}</Col>
                <Col>Positive: {item.r}</Col>
                <Col><b>Score: {item.y}</b></Col>
                <Col>
                  <button onClick={boost(item.id)} className="boost-btn">+</button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        ))}
      </div>
    )
  }
}
