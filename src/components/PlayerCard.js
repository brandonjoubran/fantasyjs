import './PlayerCard.css';

import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

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
                <Col sm={1} lg={1} className='month-heading d-flex justify-content-center align-items-center fw-bolder' >
                    {numToMonth(month.month)}
                </Col>
                
                <Col lg={1} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='monthly-stat-heading d-flex justify-content-center text-center'>
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
                            <Row className='monthly-stat-heading d-flex justify-content-center text-center' >
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
                            <Row className='monthly-stat-heading d-flex justify-content-center text-center'>
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
                            <Row className='monthly-stat-heading d-flex justify-content-center text-center'>
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
                            <Row className='monthly-stat-heading d-flex justify-content-center text-center'>
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
                            <Row className='monthly-stat-heading d-flex justify-content-center text-center'>
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
                <Card.Body className="d-flex flex-column">
                    <Card.Title> 
                        <Container>
                            <Row>
                                <Col lg={1} md={1} sm={1} className='d-flex p-0 justify-content-center'>
                                    <div className='img-wrapper' style={{maxWidth: '60px', maxHeight: '60px'}}>
                                        <Image src={`https://cms.nhl.bamgrid.com/images/headshots/current/60x60/${props.player.info.id}@2x.jpg`} roundedCircle style={{border: "1px solid black", width:'100%', height:"100%"}}></Image> 
                                    </div>
                                </Col>
                                <Col lg={'auto'} md={'auto'} sm={'auto'} className='d-flex flex-column justify-content-center'>
                                
                                    <Row className="ps-2 py-1">
                                        {props.player.info.firstName} {props.player.info.lastName} (2021-22)

                                    </Row>
                                    <Row>
                                        <Card.Subtitle className="ps-2 text-muted">{props.player.team.teamAbrv} {props.player.info.pos} Age: {props.player.info.age}</Card.Subtitle>

                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        </Card.Title>
                    <Card.Text className="h-100">
                        <Container className="h-100">

                            
                            <Row className="h-100">
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
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title>Team's Stats Rankings</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.player.team.teamName} (2021-22) </Card.Subtitle>
                        <Card.Text className='d-flex h-100'>
                            <Container className='d-flex h-100'>
                                <Col className='d-flex h-100'>
                                    {renderTeamCardStats()}
                                </Col>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            
        )
    }

    function renderTeamCardStats (){
        return(
            <Row>
                <Col>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            PP%
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            <div className='d-flex justify-content-center w-25'>
                                {props.player.team.teamStats[1].splits[0].stat['powerPlayPercentage']}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            PPO
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                                {props.player.team.teamStats[1].splits[0].stat['powerPlayOpportunities']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            PPG
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                                {props.player.team.teamStats[1].splits[0].stat['powerPlayGoals']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            S/G
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                                {props.player.team.teamStats[1].splits[0].stat['shotsPerGame']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            S%
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.team.teamStats[1].splits[0].stat['shootingPctRank']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            G/G
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.team.teamStats[1].splits[0].stat['goalsPerGame']}
                        </Col>
                    </Row>
                </Col>

            </Row>
    )}

    function renderPlayerTotalCard () {
        console.log(props.player.set)
        if(!props.player.set){
            return
        }
        return (
            <Card className='mt-3'>
                <Card.Body>
                    <Card.Title>Player Totals</Card.Title>
                    <Card.Text>
                        <Container>
                                {renderPlayerTotalCardStats()}
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        )
    }

    function renderPlayerTotalCardStats () {
        return (
            <Row className={`mt-3 justify-content-start`}  >
                
                <Col lg={4} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                               GP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['games']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='d-flex justify-content-center text-center' style={{backgroundColor:'#dc3545', color:'white'}}>
                                Points
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['points']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                                ATOI
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['timeOnIcePerGame']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={1} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                               G
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['goals']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                                ESP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['points'] - props.player.stats.statsTotals['powerPlayPoints'] - props.player.stats.statsTotals['shortHandedPoints']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                                PPP
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['powerPlayPoints']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                                Shots
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['shots']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                                Shot%
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['shotPct']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
                <Col lg={4} md={3} sm={2} xs={4}>        
                    <Container>
                        <Col>
                            <Row className='total-stat-heading d-flex justify-content-center text-center'>
                                Hits
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                {props.player.stats.statsTotals['hits']}
                            </Row>
                        </Col>
                    </Container>
                </Col>
            </Row>
        )
    }

    function renderGraphCard () {
        console.log(props.player.set)
        if(!props.player.set){
            return
        }
        return (
            <Card className='mt-3'>
                <Card.Body className='p-2 pt-0'>
                    <Card.Text>
                        <Container>
                                {renderLineChart()}
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        )
    }

    function renderLineChart () {
        console.log(props.player.set)
        if(!props.player.set){
            return
        }
        console.log(props.player.stats.statsPrevYear['games'])
        let lineData = {
            curSeason: {
                "points": props.player.stats.statsTotals['points'],
                "games": props.player.stats.statsTotals['games'],
                "ppg": props.player.stats.statsTotals['points'] / props.player.stats.statsTotals['games'],
                "esp/g": (props.player.stats.statsTotals['points'] - props.player.stats.statsTotals['powerPlayPoints'] - props.player.stats.statsTotals['shortHandedPoints']) / props.player.stats.statsTotals['games']
            },
            prevSeason: {
                "points": props.player.stats.statsPrevYear['points'],
                "games": props.player.stats.statsPrevYear['games'],
                "ppg": props.player.stats.statsPrevYear['points'] / props.player.stats.statsPrevYear['games'],
                "esp/g": (props.player.stats.statsPrevYear['points'] - props.player.stats.statsPrevYear['powerPlayPoints'] - props.player.stats.statsPrevYear['shortHandedPoints']) / props.player.stats.statsPrevYear['games']

            },
            prevPrevSeason: {
                "points": props.player.stats.statsTwoYrAgo['points'],
                "games": props.player.stats.statsTwoYrAgo['games'],
                "ppg": props.player.stats.statsTwoYrAgo['points'] / props.player.stats.statsTwoYrAgo['games'],
                "esp/g": (props.player.stats.statsTwoYrAgo['points'] - props.player.stats.statsTwoYrAgo['powerPlayPoints'] - props.player.stats.statsTotals['shortHandedPoints']) / props.player.stats.statsTwoYrAgo['games']
            }
        }
        
        const data = {
            labels: ["2020", "2021", "2022"],
            datasets: [
              {
                label: "Pts/G",
                data: [lineData.prevPrevSeason["ppg"], lineData.prevSeason["ppg"], lineData.curSeason["ppg"]],
                fill: false,
                backgroundColor: "rgba(6, 156,51, .3)",
                borderColor: "#02b844",
              },
              {
                label: "ESP/G",
                data: [lineData.prevPrevSeason["esp/g"], lineData.prevSeason["esp/g"], lineData.curSeason["esp/g"]],
                fill: false,
                backgroundColor: "red",
                borderColor: "red",
              }
            ]
          }
        
        return (
            <Line data={data} options={{
                plugins: {
                    title: {
                        display: true,
                        text: `${props.player.info.firstName} ${props.player.info.lastName}`,
                        align: 'start',
                        color: 'black',
                        font: {
                            size: 30,
                        },
                        padding: {
                            top: 30,
                            bottom: 10,
                            left:50
                        }
                    },
                }
            }} />
        )

    }

    function renderPlayerRankingsCard() {

        console.log(props.player.set)
        if(!props.player.set){
            return
        }
        return (
                <Card >
                    <Card.Body className='d-flex flex-column'>
                        <Card.Title>Player's Stats Rankings</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.player.team.teamName} (2021-22) </Card.Subtitle>
                        <Card.Text className='d-flex h-100'>
                            <Container className='d-flex h-100'>
                                <Col className='d-flex h-100'>
                                    {renderPlayerRankings()}
                                </Col>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            
        )
    }

    function renderPlayerRankings() {
        console.log(props.player.stats)

        return(
            <Row>
                <Col>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            Goals
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            <div className='d-flex justify-content-center w-25'>
                            {props.player.stats.statsRankings['rankGoals']}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            Assists
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankAssists']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            Points
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankPoints']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            PPG
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankPowerPlayGoals']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            Hits
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankHits']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            Shots
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankShots']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            Shot%
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankShotPct']}
                        </Col>
                    </Row>
                </Col>
                <Col lg={12}>
                    <Row className={`mt-2 justify-content-center`}  >
                        <Col lg={6} sm={1} className='team-ranking-category d-flex justify-content-center align-items-center fw-bolder'>
                            +/-
                        </Col>
                        
                        <Col lg={6} sm={1} className='d-flex justify-content-center align-items-center'>
                            {props.player.stats.statsRankings['rankPlusMinus']}
                        </Col>
                    </Row>
                </Col>

            </Row>
        )
    }

    if(props.player != undefined){
        console.log(props.set)
        return (
            <Container className='mb-4'>
                <Row>
                <Col lg={8} className="d-flex">
                    {renderPlayerCard()}
                </Col>
                <Col lg={4} className="d-flex flex-column">
                    <Row className="d-flex flex-grow-1">
                        {renderTeamCard()}
                    </Row>
                    <Row>
                        {renderPlayerTotalCard()}
                    </Row>
                
                </Col>
        
                </Row>
                <Row>
                    <Col lg={8}>
                        {renderGraphCard()}
                    </Col>
                    <Col lg={4} className="d-flex flex-column pt-3">
                    <Row className="d-flex flex-grow-1">
                        {renderPlayerRankingsCard()}
                    </Row>
                
                </Col>
                    
                </Row>
                    
            </Container>
        
          );
    }
}

export default PlayerCard;