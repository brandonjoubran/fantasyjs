import './App.css';
import React, { useState } from 'react';
import Header from './Header.js';
import Searchbar from './Searchbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerCard from './PlayerCard';

function App() {
  

  const [player, setPlayer] = useState({})

  const addSearchHandler = (search) => {
    console.log(search)
    setPlayer(search)
  }

  return (

    <Container >
      <Header />
      <Searchbar addSearchHandler={addSearchHandler} />
      <PlayerCard player={player}/>
    </Container>
    
  )
}

export default App;
