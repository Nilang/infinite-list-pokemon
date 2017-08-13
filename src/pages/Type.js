import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import { LinkContainer } from 'react-router-bootstrap';
import {
  ListGroup,
  ListGroupItem
 } from 'react-bootstrap';

export default class Type extends Component {

  static propTypes: {
    pokemons: PropTypes.array.isRequired,
    refreshPokemons: PropTypes.func.isRequired
  };

  componentDidMount(){
    this.props.refreshPokemons('http://pokeapi.salestock.net/api/v2/type/'+this.props.match.params.name+'/')
  }

  render(){
    if (this.props.pokemons !== undefined) {
      return(
        <div>
          <ListGroup>
            {this.props.pokemons.map((pokemon, index) => {
              return(
                <LinkContainer key={index} to={'/pokemon/'+(index+1)}>
                  <ListGroupItem>
                    {pokemon.name}
                  </ListGroupItem>
                </LinkContainer>
              );
            })}
          </ListGroup>
        </div>
      );
    }else{
      return(
        <div>
          Loading...
        </div>
      );
    }
  };
};
