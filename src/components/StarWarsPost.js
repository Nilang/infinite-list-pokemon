import React from 'react';
import PropTypes from 'prop-types'
import {
  Panel,
  Image,
  ListGroup
} from 'react-bootstrap';

// App Element
import ListGroup2Item from './ListGroup2Item';

const StarWars = props => {
  return(
    <div id={props.lid}>
      <Panel header={props.name}>
        <ListGroup>
          <ListGroup2Item label="Gender" value={props.gender}/>
          <ListGroup2Item label="Height" value={props.birth_year}/>
        </ListGroup>
      </Panel>
    </div>
  );
}

StarWars.propTypes = {
  lid: PropTypes.string,
  name: PropTypes.string.isRequired,
  birth_year: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired
};

export default StarWars;
