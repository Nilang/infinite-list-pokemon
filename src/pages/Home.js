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
    // this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
  };

  requestPokemons = (targetUrl) => {
    fetch(targetUrl)
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

  testingPokemon = () => {
    this.props.addPokemon({name:"testing"});
  }

  componentDidMount(){
    // var search = QueryString.parse(this.props.location.search);
    // if(search.filter !== undefined){
    //
    // }else{
    //   this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
    // }
    console.log(this.props.pokemons[0]);
    if (this.props.pokemons[0] === undefined){
      this.testingPokemon();
      console.log("weew");
    }
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
    console.log("bot, "+windowBottom);
    console.log("doc, "+docHeight);
    if (windowBottom >= docHeight) {
      // Bottom reached
      // this.requestPokemons(this.state.next);
      console.log("reach bottom");
      this.testingPokemon();
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
