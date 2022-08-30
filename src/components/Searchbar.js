import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container } from "react-bootstrap";

const Searchbar = (props) => {

    const [searchedPlayer, setSearchedPlayer] = useState({
        name: "",
    })

    const [player, setPlayer] = useState({
        id: false,
        firstName: "",
        lastName: "",
        teamAbrv: "",
        pos: "", 
        age: ""
    })

    const [playerStats, setPlayerStats] = useState({
        firstName: "",
        lastName: "",
        teamAbrv: "",
        pos: "",
        age:"",
        statsPerMonth: []
    })

    useEffect( () => {
        //alert('new player name ' + player.name)

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
                let teamAbrv = data.suggestions[0].team.abbreviation
                let pos = splitData.primaryPosition.abbreviation
                let age = splitData.currentAge
                console.log(playerId)
                setPlayer({
                    id: playerId,
                    firstName: firstName, 
                    lastName: lastName,
                    teamAbrv: teamAbrv,
                    age: age,
                    pos: pos
                })
                
            }
        }).then( () => console.log(player))

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
                pos: player.pos,
                age: player.age,
                statsPerMonth: stats
            })
        })
    }, [player])

    useEffect( () => {
        console.log(playerStats)
        props.addSearchHandler(playerStats)
    }, [playerStats])
    
    return (
        <Container className="d-flex justify-content-center w-100">
            <InputGroup className="mb-3 p-3 w-100 d-flex justify-content-center">
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