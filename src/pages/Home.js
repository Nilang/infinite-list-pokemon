import React, { Component, ExecutionEnvironment } from 'react';
import PokeApi from 'pokeapi';
import {
  ListGroup,
  ListGroupItem
 } from 'react-bootstrap';

export default class Home extends Component {

  constructor(){
    super();
    this.state = {
      pokemons: [],
      next: ""
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  requestPokemons = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        responseData.results.map((pokemon, index) => {
          this.state.pokemons.push(pokemon);
        });
        this.setState({
          pokemons: this.state.pokemons,
          next: responseData.next
         });
      });
  };

  componentDidMount(){
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
    return(
      <div>
        <ListGroup>
          {this.state.pokemons.map((pokemon, index) => {
            var lastid;
            if (index === (this.state.pokemons.length - 1)){
              lastid = "lastChild"
            }
            return(
              <ListGroupItem href="#">{pokemon.name}</ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
};
