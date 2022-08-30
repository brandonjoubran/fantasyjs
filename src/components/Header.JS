import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Header = () => {
    return (
        <Container className=''>
          <Row className='pt-3 pb-3 d-flex w-100'>
            <Col className='d-flex justify-content-center align-items-center w-100'>
                <h1>FantasyJS</h1>
            </Col>
          </Row>
          <Row className='pt-3 pb-3 justify-content-center align-items-center w-100'>
          <Col className='d-flex justify-content-center align-items-center w-100 text-center'>
                <p>Welcome to FantasyJS. Enter an NHL player's name to see an analysis card...</p>
            </Col>
          </Row>
            
        </Container>
      );
}

export default Header;