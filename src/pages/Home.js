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
    addPokemon: PropTypes.func.isRequired,
    pokemons: PropTypes.array.isRequired
  };

  constructor(){
    super();
    this.state = {
      next: ""
    };
    this.handleScroll = this.handleScroll.bind(this);
  };

  requestPokemons = (targetUrl) => {
    fetch(targetUrl, {
      headers: {
        'User-agent': 'your bot 0.1'
      }
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        responseData.results.map((pokemon, index) => {
          this.props.addPokemon(pokemon);
        });
        this.setState({
          next: responseData.next
         });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount(){
    // var search = QueryString.parse(this.props.location.search);
    // if(search.filter !== undefined){
    //
    // }else{
    //   this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
    // }
    this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll(){
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      // Bottom reached
      this.requestPokemons(this.state.next);
    } else {
      // Not yet

    }
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
