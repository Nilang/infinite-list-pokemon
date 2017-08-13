import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import { LinkContainer } from 'react-router-bootstrap';
import {
  ListGroup,
  ListGroupItem
 } from 'react-bootstrap';

export default class Home extends Component {

  static propTypes: {
    requestPokemons: PropTypes.func.isRequired,
    pokemons: PropTypes.array.isRequired,
    next: PropTypes.string.isRequired
  };

  constructor(){
    super();
    this.handleScroll = this.handleScroll.bind(this);
  };

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll(){
    
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
  }
};
