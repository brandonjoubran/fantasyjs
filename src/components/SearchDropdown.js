import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

const SearchDropdown = (props) =>{
    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };
    
        {
        if(props.suggestions != undefined){
            console.log(props.suggestions)
            /*<ListGroup.Item action onClick={alertClicked}>
                        Option 1
                     </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        Option 2
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={alertClicked}>
                        Option 3
                    </ListGroup.Item>*/
            return (
                <ListGroup defaultActiveKey="#link1">
                    {props.suggestions.map((player => {
                        return (
                        <ListGroup.Item action onClick={alertClicked}>
                            {player.person.fullName}
                        </ListGroup.Item>
                        )
                    }))}
                </ListGroup>
            );
        }else{
            
        }
    
    }
        
}

export default SearchDropdown;