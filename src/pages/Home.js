// Library
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button,
  ListGroup,
  ListGroupItem
 } from 'react-bootstrap';

// Home is tha main component called on route '/'
export default class Home extends Component {

  // App props
  static propTypes= {
    pokemons: PropTypes.array.isRequired,
    requestPokemonUrl: PropTypes.func.isRequired
  };

  // Override Component functions
  // Called before render
  componentWillMount(){
    if(this.props.pokemons.length === 0){
      this.props.requestPokemonUrl('http://pokeapi.salestock.net/api/v2/pokemon/');
    }
  }

  // Called after render
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  };

  // Called after render unmount
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  };

  // Button event
  handleButton = () => {
    this.props.requestPokemonUrl();
  };

  // Scroll event
  handleScroll = () => {
    if((document.body.scrollTop+window.innerHeight) === document.body.scrollHeight){
      this.props.requestPokemonUrl();
    }
  };

  // App render
  render(){
    if (this.props.pokemons.length !== 0) {
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
          <div className="footer_container">
            <Button ref="button_more" onClick={this.handleButton.bind(this)}>See more</Button>
          </div>
        </div>
      );
    }
    // Call when the above component not ready yet.
    return(
      <div>
        Loading...
      </div>
    );

  };
};
