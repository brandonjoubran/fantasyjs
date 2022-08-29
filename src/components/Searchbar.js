import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Searchbar = () => {
    return (
        <InputGroup className="mb-3 p-3">
        <Form.Control
          placeholder="Player name"
          aria-label="Player name"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    )
}

export default Searchbar;