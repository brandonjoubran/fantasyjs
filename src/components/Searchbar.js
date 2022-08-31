import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from "react-bootstrap";

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
            age:""
        },
        stats: {
            statsPerMonth: [],
            statsTotals: {}
        },
        team: {
            teamName: "",
            teamAbrv: "",
            teamStats: [],
            teamLink: ""
        }
    })

    useEffect( () => {
        console.log('aff')
        console.log(playerFull)
        props.addSearchHandler(playerFull)
    }, [done])

    useEffect( () => {
        fetch(`https://suggest.svc.nhl.com/svc/suggest/v1/activeplayers/${searchedPlayer.name}/`)
        .then(results => results.json())
        .then(data => {
            console.log(data.suggestions)
            if(data.suggestions.length == 0){
                return;
            }else {
                let splitData = data.suggestions[0].person
                let playerId = splitData.id
                let firstName = splitData.firstName
                let lastName = splitData.lastName
                let teamName = data.suggestions[0].team.name
                let teamAbrv = data.suggestions[0].team.abbreviation
                let pos = splitData.primaryPosition.abbreviation
                let age = splitData.currentAge
                let teamLink = splitData.currentTeam.link
                console.log(teamLink)
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
        fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=byMonth&season=20212022`)
        .then(results => results.json())
        .then(data => {
            console.log(data.stats[0].splits[0].stat.games)
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
        fetch(`https://statsapi.web.nhl.com${player.teamLink}/stats`)
        .then(results => results.json())
        .then(teamData => {
            console.log('one more')
            console.log(teamData.stats)
            setPlayerFull({
                set: true,
                info: {
                    firstName: player.firstName,
                    lastName: player.lastName,
                    pos: player.pos,
                    age:player.age
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
            console.log('totals2')
            console.log(playerFull)
            console.log(totals.stats[0].splits[0].stat)
            
            
            setPlayerFull(curr => ({
                ...curr,
                stats: {
                    ...curr.stats,
                    statsTotals: totals.stats[0].splits[0].stat
                },
            }))
            
            /*setPlayerFull({
                set: true,
                info: {
                    firstName: player.firstName,
                    lastName: player.lastName,
                    pos: player.pos,
                    age:player.age
                },
                stats: {
                    ...playerFull,
                    statsTotals: totals.stats[0].splits[0].stat
                },
                team: {
                    ...playerFull.team
                }
            })*/
        })
        .finally(()=> {
            setDone({
                "done":true
            })
        })

    }, [playerStats])

    function getPlayerStatsTotals(){
        console.log('totals')
        fetch(`https://statsapi.web.nhl.com/api/v1/people/${player.id}/stats?stats=statsSingleSeason&season=20212022`)
        .then(results => results.json())
        .then(totals => {
            console.log('totals2')
            console.log(totals.stats[0].splits[0].stat)
            setPlayerFull({
                ...playerFull,
                stats: {
                    ...playerFull,
                    statsTotals: totals.stats[0].splits[0].stat
                }
            })
        })
    }
    
    return (
        <Container className="d-flex justify-content-center w-100">
            <InputGroup className="mb-3 p-2 w-100 d-flex justify-content-center">
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
      </Container>
    )
}

export default Searchbar;