import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

const ListGroup2Item = props => {
  return(
    <ListGroupItem className="pokemon-data-list">
      <div className="pokemon-data-list__group">
        <div className="pokemon-data-list__column pokemon-data-list__left">
          {props.label}
        </div>
        <div className="pokemon-data-list__column pokemon-data-list__right">
          {props.value}
        </div>
      </div>
    </ListGroupItem>
  );
}

ListGroup2Item.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default ListGroup2Item;
