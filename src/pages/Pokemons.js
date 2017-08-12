import React, { Component } from 'react';
import PropTypes from 'prop-types';

// App Component
import Header from '../components/Header';
import PokemonPost from '../components/PokemonPost';

export default class Pokemon extends Component {

  constructor(){
    super();
    this.state = {
      pokemons: []
    };
  }

  requestPokemon = (targetUrl) => {
    console.log('request:'+targetUrl);
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.state.pokemons.push(responseData);
        this.setState({
          pokemons: this.state.pokemons,
         });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  requestPokemons = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        responseData.results.map((pokemon, index) => {
          this.requestPokemon(targetUrl+(index+1)+'/');
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount(){
    this.requestPokemons('http://pokeapi.salestock.net/api/v2/pokemon/');
  };

  render(){
    console.log("render");
    // let pokepost = null;
    // if(this.state.pokemon.id != undefined){
    //   pokepost = <PokemonPost
    //     id={this.state.pokemon.id}
    //     name={this.state.pokemon.name}
    //     image={this.state.pokemon.sprites.front_default}
    //     base_experience={this.state.pokemon.base_experience}
    //     height={this.state.pokemon.height}
    //     />;
    // }else{
    //   pokepost = <h5>Loading...</h5>
    // }
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          {this.state.pokemons.map((pokemon, index) => {
            return(
              <PokemonPost
                key={index}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                base_experience={pokemon.base_experience}
                height={pokemon.height}
              />
            );
           })
          }
        </div>
      </div>
    );
  }
};
