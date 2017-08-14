import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button,
  ListGroup,
  ListGroupItem
 } from 'react-bootstrap';

export default class Home extends Component {

  constructor(){
    super();
  };

  static propTypes= {
    pokemons: PropTypes.array.isRequired,
    requestPokemonUrl: PropTypes.func.isRequired
  };

  componentWillMount(){
    if(this.props.pokemons.length === 0){
      this.props.requestPokemonUrl('https://pokeapi.salestock.net/api/v2/pokemon/');
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleButton = () => {
    this.props.requestPokemonUrl();
  };

  handleScroll = () => {
    if((document.body.scrollTop+window.innerHeight) === document.body.scrollHeight){
      this.props.requestPokemonUrl();
    }
  };

  render(){
    if (this.props.pokemons.length !== 0) {
      return(
        <div>
          <ListGroup>
            {this.props.pokemons.map((pokemon, index) => {
              return(
                <LinkContainer key={index} to={pokemon.url.replace('https://pokeapi.salestock.net/api/v2','')}>
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
    }else{
      return(
        <div>
          Loading...
        </div>
      );
    }
  };
};
