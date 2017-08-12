import React from 'react';
import PropTypes from 'prop-types'
import {
  Panel,
  Image,
  ListGroup
} from 'react-bootstrap';

// App Element
import ListGroup2Item from './ListGroup2Item';

const PokemonPost = props => {
  return(
    <div id={props.lid}>
      <Panel header={props.name}>
        <Image className="pokemon_picture" src={props.image} />
        <ListGroup>
          <ListGroup2Item label="ID" value=""/>
        </ListGroup>
      </Panel>
    </div>
  );
}

PokemonPost.propTypes = {
  base_experience: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.number,
  is_default: PropTypes.bool,
  image: PropTypes.string,
  lid: PropTypes.string,
  name: PropTypes.string
};

export default PokemonPost;
