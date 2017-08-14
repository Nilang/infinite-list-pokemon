import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-bootstrap';
import {
  Badge,
  ButtonToolbar,
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
        <Image className="pokemon_picture" src={props.image.replace('https://pokeapi.salestock.net/media/', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/')} />
        <ListGroup>
          <ListGroup2Item label="ID" value={props.id.toString()}/>
          <ListGroup2Item label="Name" value={props.name}/>
          <ListGroup2Item label="Height" value={props.height.toString()}/>
          <ListGroup2Item label="Weight" value={props.weight.toString()}/>
          <ListGroup2Item label="Base Experience" value={props.base_experience.toString()}/>
        </ListGroup>
        <div>
          <h5>Type</h5>
          <ButtonToolbar>
            {props.types.map((type, index) => {
              return(
                <Badge key={"badge_"+index} className={"badge__type badge__type-"+type.type.name}>{type.type.name}</Badge>
              );
            })}
          </ButtonToolbar>
        </div>
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
  name: PropTypes.string,
  types: PropTypes.array,
  weight: PropTypes.number
};

export default PokemonPost;
