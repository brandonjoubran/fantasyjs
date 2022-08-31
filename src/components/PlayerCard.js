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


    const renderPlayerCardStats = props.player?.stats?.statsPerMonth?.map((month, index) => {
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
                                Points
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
        console.log(props.player.set)
        if(!props.player.set){
            return
        }
        return (
            <Card >
                <Card.Body>

                    <Card.Title>{props.player.info.firstName} {props.player.info.lastName} (2021-22)</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.player.team.teamAbrv} {props.player.info.pos} Age: {props.player.info.age}</Card.Subtitle>
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

    function renderTeamCard () {
        console.log(props.player.set)
        if(!props.player.set){
            return
        }
        return (
            <Card >
                <Card.Body>
                    <Card.Title>Team's Stats Rankings</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.player.team.teamName} (2021-22) </Card.Subtitle>
                    <Card.Text>
                        <Container>
                            <Row>
                                {renderTeamCardStats()}
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        )
    }

    function renderTeamCardStats (){
        return(
            <div>
                <Row className={`mt-3 justify-content-center`}  >
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'#d19ef8'}}>
                        PP%
                    </Col>
                    
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                        {props.player.team.teamStats[1].splits[0].stat['powerPlayPercentage']}
                    </Col>
                </Row>
                <Row className={`mt-3 justify-content-center`}  >
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'#d19ef8'}}>
                        PPO
                    </Col>
                    
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                        {props.player.team.teamStats[1].splits[0].stat['powerPlayOpportunities']}
                    </Col>
                </Row>
                <Row className={`mt-3 justify-content-center`}  >
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'#d19ef8'}}>
                        PPG
                    </Col>
                    
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                        {props.player.team.teamStats[1].splits[0].stat['powerPlayGoals']}
                    </Col>
                </Row>
                <Row className={`mt-3 justify-content-center`}  >
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'#d19ef8'}}>
                        S/G
                    </Col>
                    
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                        {props.player.team.teamStats[1].splits[0].stat['shotsPerGame']}
                    </Col>
                </Row>
                <Row className={`mt-3 justify-content-center`}  >
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'#d19ef8'}}>
                        S%
                    </Col>
                    
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                        {props.player.team.teamStats[1].splits[0].stat['shootingPctRank']}
                    </Col>
                </Row>
                <Row className={`mt-3 justify-content-center`}  >
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center fw-bolder' style={{backgroundColor:'#d19ef8'}}>
                        G/G
                    </Col>
                    
                    <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                        {props.player.team.teamStats[1].splits[0].stat['goalsPerGame']}
                    </Col>
                </Row>
            </div>
    )}


  return (
    <Container>
        <Row>
        <Col lg={8}>
            {renderPlayerCard()}
        </Col>
        <Col lg={4}>
        {renderTeamCard()}
        </Col>

        </Row>
            
    </Container>

  );
}

export default PlayerCard;