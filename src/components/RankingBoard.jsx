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
            <CardBody className="bg-basic">
              <CardTitle>Empty</CardTitle>
              <CardText>Run and add some items to see changes</CardText>
            </CardBody>
          </Card>
        </div>
      )
    }

    const fixedItems = [...items]

    return (
      <div>
        {fixedItems.sort((a,b) => a.y > b.y ? -1 : 1).map((item, idx) => (
          <Card className={setBg(idx)}>
            <CardBody>
              <Row>
                <Col><h4>#{item.id}</h4></Col>
                <Col>
                  <div><b>T0:</b></div>
                  <b>{item.x}</b>
                </Col>
                <Col>
                  <div><b>Positive:</b></div>
                  <b>{item.r}</b>
                </Col>
                <Col>
                  <div><b>Score:</b></div>
                  <b>{item.y}</b>
                </Col>
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
