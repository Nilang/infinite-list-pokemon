import React, { Component } from 'react';
import PropTypes from 'prop-types';

// App Component
import PokemonPost from '../components/PokemonPost'

export default class Pokemon extends Component {

  constructor(){
    super();
    this.state = {
      pokemon: {}
    };
  }

  requestPokemon = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({
          pokemon: responseData
         });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount(){
    this.requestPokemon('http://pokeapi.salestock.net/api/v2/pokemon/'+this.props.match.params.id+'/');
  };

  render(){
    if (this.state.pokemon.id != undefined){
      return(
        <div>
          <PokemonPost
            id={this.state.pokemon.id}
            name={this.state.pokemon.name}
            image={this.state.pokemon.sprites.front_default}
            base_experience={this.state.pokemon.base_experience}
            height={this.state.pokemon.height}
            />
        </div>
      );
    }
    return(
      <div>
        Loading...
      </div>
    );
  }
};
