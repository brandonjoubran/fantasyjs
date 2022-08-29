import './App.css';
import React from 'react';
import Header from './Header.js';
import Searchbar from './Searchbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container >
      <Header />
      <Searchbar />
      
    </Container>
  )
}

export default App;
