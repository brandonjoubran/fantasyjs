import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PlayerCard = (props) => {

    const numToMonth = (num) => {
        if(num === 10){
            return "Oct."
        }else if(num === 11) {
            return "Nov."
        }else if(num === 12) {
            return "Dec."
        }else if(num === 1) {
            return "Jan."
        }else if(num === 2) {
            return "Feb."
        }else if(num === 3) {
            return "Mar."
        }else {
            return "Apr."
        }
    }

    const monthOrder = (month) => {
        if(month === 10){
            return 'first'
        }else if(month === 11) {
            return 2
        }else if(month === 12) {
            return 3
        }else if(month == 1) {
            return 4
        }else if(month === 2) {
            return 5
        }else if(month === 3) {
            return 'last'
        }else {
            return 'last'
        }
    }


    const renderPlayerCardStats = props.player?.statsPerMonth?.map((month, index) => {
        return (
            
            <Row className={`mt-3 justify-content-center order-${monthOrder(month.month)}`}  >
                <Col sm={1} lg={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'lightgray'}}>
                    {numToMonth(month.month)}
                </Col>
                
                <Col lg={1} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'lightblue'}}>
                               GP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {month.stat.games}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={2} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'#dc3545', color:'white'}}>
                                Total Points Scored
                            </Row>
                            <Row className='d-flex justify-content-center'>
                            {month.stat.points}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={1} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'lightblue'}}>
                               ATOI
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {month.stat.timeOnIcePerGame}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={1} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'lightblue'}}>
                               G
                            </Row>
                            <Row className='d-flex justify-content-center'>
                            {month.stat.goals}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={2} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'lightblue'}}>
                                ESP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                            {month.stat.points - month.stat.powerPlayPoints - month.stat.shortHandedPoints}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={2} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'lightblue'}}>
                                PPP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                            {month.stat.powerPlayPoints}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={2} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'lightblue'}}>
                                SHP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                            {month.stat.shortHandedPoints}
                            </Row>
                        </Col>
                    </Container>
                </Col>
            </Row>
            
        );
    })

    function renderPlayerCard () {
        if(props.player.firstName == ""){
            return
        }
        return (
            <Card >
                <Card.Body>

                    <Card.Title>{props.player.firstName} {props.player.lastName} (2021-22)</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.player.teamAbrv} {props.player.pos} Age: {props.player.age}</Card.Subtitle>
                    <Card.Text>
                        <Container>


                            <Row>
                                {renderPlayerCardStats}
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        )
    }


  return (
    <Container>
        <Row>
        <Col lg={12}>
            {renderPlayerCard()}
        </Col>

        </Row>

    </Container>

  );
}

export default PlayerCard;