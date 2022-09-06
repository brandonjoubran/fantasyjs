import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import logo from '../img/nhl-logo-react.jpeg'
import avatar from '../img/skater.jpg'

const Searchbar = (props) => {


    const [searchedPlayer, setSearchedPlayer] = useState({
        name: "",
    })

    const[done, setDone] = useState({
        "done":false
    })

    const [player, setPlayer] = useState({
        id: false,
        firstName: "",
        lastName: "",
        teamAbrv: "",
        teamName: "",
        teamLink: "",
        pos: "", 
        age: ""
    })

    const [playerStats, setPlayerStats] = useState({
        firstName: "",
        lastName: "",
        teamAbrv: "",
        pos: "",
        age:"",
        statsPerMonth: [],
        teamStats: []
    })

    const [playerFull, setPlayerFull] = useState({
        set: false,
        info: {
            firstName: "",
            lastName: "",
            pos: "",
            age:"",
            id:""
        },
        stats: {
            statsPerMonth: [],
            statsTotals: {},
            statsPrevYear: {},
            statsTwoYrAgo: {},
            statsRankings: {}
        },
        team: {
            teamName: "",
            teamAbrv: "",
            teamStats: [],
            teamLink: ""
        }
    })

    const [playerList, setPlayerList] = useState([])

    useEffect( () => {
        props.addSearchHandler(playerFull)
    }, [done])

    useEffect( () => {
        fetch(`https://suggest.svc.nhl.com/svc/suggest/v1/activeplayers/${searchedPlayer.name}/`)
        .then(results => results.json())
        .then(data => {
            if(data.suggestions.length == 0){
                setPlayerFull({
                    set:false
                })
                setDone({
                    "done":false
                })
                setPlayerList(data.suggestions)
                return;
            }else if(data.suggestions.length > 1){

                setPlayerFull({
                    set:false
                })
                setDone({
                    "done":false
                })
                setPlayerList(data.suggestions)
                
                
                return 
            }else {
                setPlayerList(undefined)
                let splitData = data.suggestions[0].person
                let playerId = splitData.id
                let firstName = splitData.firstName
                let lastName = splitData.lastName
                let teamName = data.suggestions[0].team.name
                let teamAbrv = data.suggestions[0].team.abbreviation
                let pos = splitData.primaryPosition.abbreviation
                let age = splitData.currentAge
                let teamLink = splitData.currentTeam.link
                setPlayer({
                    id: playerId,
                    firstName: firstName, 
                    lastName: lastName,
                    teamName: teamName,
                    teamAbrv: teamAbrv,
                    teamLink: teamLink,
                    age: age,
                    pos: pos
                })
                
            }
        })

    }, [searchedPlayer] )


    useEffect( () => {
        if(!player.id){
            return
        }
        fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=byMonth&season=20212022`)
        .then(results => results.json())
        .then(data => {
            setPlayerList(undefined)
            let stats = data.stats[0].splits

            setPlayerStats({
                firstName: player.firstName, 
                lastName: player.lastName,
                teamAbrv: player.teamAbrv,
                teamLink: player.teamLink,
                pos: player.pos,
                age: player.age,
                statsPerMonth: stats
            })
        })
    }, [player])

    useEffect( () => {
        if(!player.id){
            return
        }
        fetch(`https://statsapi.web.nhl.com${player.teamLink}/stats`)
        .then(results => results.json())
        .then(teamData => {
            setPlayerFull({
                set: true,
                info: {
                    firstName: player.firstName,
                    lastName: player.lastName,
                    pos: player.pos,
                    age:player.age,
                    id:player.id
                },
                stats: {
                    statsPerMonth: playerStats.statsPerMonth,
                    statsTotals: {}
                },
                team: {
                    teamName: player.teamName,
                    teamAbrv: player.teamAbrv,
                    teamStats: teamData.stats,
                    teamLink: player.teamLink
                }
            })
            return fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=statsSingleSeason&season=20212022`)
        })
        .then(results2 => results2.json())
        .then(totals => {
                        
            setPlayerFull(curr => ({
                ...curr,
                stats: {
                    ...curr.stats,
                    statsTotals: totals.stats[0].splits[0].stat
                },
            }))

            return fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=statsSingleSeason&season=20202021`)
            
        })
        .then(result3 => result3.json())
        .then(totals2 => {
            setPlayerFull(curr => ({
                ...curr,
                stats: {
                    ...curr.stats,
                    statsPrevYear: totals2.stats[0].splits[0].stat
                },
            }))

            return fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=statsSingleSeason&season=20192020`)

        })
        .then(result4 => result4.json())
        .then(totals3 => {
            setPlayerFull(curr => ({
                ...curr,
                stats: {
                    ...curr.stats,
                    statsTwoYrAgo: totals3.stats[0].splits[0].stat
                },
            }))
            return fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=regularSeasonStatRankings&season=20212022`)
        })
        .then(result5 => result5.json())
        .then(totals4 => {
            console.log(totals4.stats[0].splits[0].stat)
            setPlayerFull(curr => ({
                ...curr,
                stats: {
                    ...curr.stats,
                    statsRankings: totals4.stats[0].splits[0].stat
                },
            }))
        })
        .finally(()=> {
            setDone({
                "done":true
            })
        })

    }, [playerStats])

    function sugs(){
        if(playerList != undefined && playerList.length > 1) {
            return (
                <ListGroup defaultActiveKey="#link1" style={{paddingRight:'72px'}}>
                    {playerList.map((player => {
                        return (
                        <ListGroup.Item action onClick={() => {
                            document.getElementById('searchBar').value = `${player.person.fullName}`

                            setPlayer({
                            id: player.person.id,
                            firstName: player.person.firstName, 
                            lastName: player.person.lastName,
                            teamName: player.team.name,
                            teamAbrv: player.team.abbreviation,
                            teamLink: player.person.currentTeam.link,
                            age: player.person.currentAge,
                            pos: player.position.abbreviation 
                        })}}>
                            <Container>
                                <Row>
                                    <Col lg={'auto'} className='d-flex p-0 justify-content-start' style={{width: '44px'}}>
                                    <div className='img-wrapper' style={{maxWidth: '36px', maxHeight: '36px'}}>
                                    <Image src={`https://cms.nhl.bamgrid.com/images/headshots/current/60x60/${player.person.id}@2x.jpg`} roundedCircle style={{border: "1px solid black", width:'100%', height:"100%"}} alt='Player pic' onError={(e) => (e.currentTarget.src = avatar)}></Image> 
                            </div>
                                    </Col>
                                    <Col className='d-flex flex-column justify-content-center'>
                                    {`${player.person.fullName} (${player.team.abbreviation}) ${player.position.abbreviation}`}
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                        )
                    }))}
                </ListGroup>
            )
        }
    }
    
    return (
        <Container className="d-flex justify-content-center w-100 flex-column mb-4">
            <InputGroup className="w-100 d-flex justify-content-center">
            <Form.Control
            placeholder="Player name"
            aria-label="Player name"
            aria-describedby="basic-addon2"
            id="searchBar"
            className="fs-4"
            />
            <Button variant="primary" id="button-addon2" onClick={() => setSearchedPlayer({ name: document.getElementById('searchBar').value })}>
            Search
            </Button>
        </InputGroup>
        {sugs()}
        
      </Container>
    )
}

export default Searchbar;