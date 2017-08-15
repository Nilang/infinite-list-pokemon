import React, { Component } from 'react';
import PropTypes from 'prop-types';

// App Component
import Loading from '../components/Loading'
import PokemonPost from '../components/PokemonPost';

// Pokemon is component to render pokemon profile. It have responsibilities to fetch the data.
export default class Pokemon extends Component {

  // App props
  static propTypes = {
    pokeUrl: PropTypes.string
  };

  // App constructor
  constructor(){
    super();
    this.state = {
      pokemon: {}
    };
  }

  // Function which fetched pokemon profile's data from server.
  requestPokemon = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        this.state = {
          pokemon: responseData
        };
        if(this.refs.pokemon){
          this.setState(this.state);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Override Component functions
  // Called after render
  componentDidMount(){
    if(this.props.match !== undefined){
      this.requestPokemon('http://pokeapi.salestock.net/api/v2/pokemon/'+this.props.match.params.id+'/');
    }else if(this.props.pokeUrl !== undefined){
      this.requestPokemon(this.props.pokeUrl);
    }
  };

  // App render
  render(){
    let pokepost = null;

    // pokemon's state exist
    if(this.state.pokemon.id !== undefined){
      pokepost = <PokemonPost
        key={'pokemon.key'+this.state.pokemon.id}
        id={this.state.pokemon.id}
        name={this.state.pokemon.name}
        image={this.state.pokemon.sprites.front_default}
        base_experience={this.state.pokemon.base_experience}
        height={this.state.pokemon.height}
        weight={this.state.pokemon.weight}
        types={this.state.pokemon.types}
        />;
    // pokemon's state doesnt exist
    }else{
      pokepost = <Loading />
    }

    return (
      <div ref="pokemon">
        {pokepost}
      </div>
    );
  }
};
