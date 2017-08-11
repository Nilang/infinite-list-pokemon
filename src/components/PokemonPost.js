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
    <div>
      <Panel header={props.name}>
        <Image className="pokemon_picture" src={props.image} />
        <ListGroup>
          <ListGroup2Item label="ID" value={props.id.toString()}/>
          <ListGroup2Item label="Name" value={props.name}/>
          <ListGroup2Item label="Base Experience" value={props.base_experience.toString()}/>
          <ListGroup2Item label="Height" value={props.height.toString()}/>
        </ListGroup>
      </Panel>
    </div>
  );
}

PokemonPost.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  base_experience: PropTypes.number,
  height: PropTypes.number
};

export default PokemonPost;
