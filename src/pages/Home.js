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

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll = () => {
    // console.log("innerH, "+window.innerHeight);
    // console.log("scrollY, "+window.scrollY);
    // console.log("offset, "+document.body.offsetHeight);
    // console.log("dscrolltop ,"+document.body.scrollTop);
    // console.log("dscrollheight ,"+document.body.scrollHeight);
    if((document.body.scrollTop+window.innerHeight) === document.body.scrollHeight){
      this.props.requestPokemons(this.props.next);
    }
  };

  render(){
    if (this.props.pokemons !== undefined) {
      return(
        <div>
          <ListGroup>
            {this.props.pokemons.map((pokemon, index) => {
              return(
                <LinkContainer key={index} to={pokemon.url.replace('http://pokeapi.salestock.net/api/v2','')}>
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
