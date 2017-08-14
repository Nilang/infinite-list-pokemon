import * as PokemonActionTypes from '../actiontypes/pokemon';

export const addPokemon = pokemon => {
  return {
    type: PokemonActionTypes.ADD_POKEMON,
    pokemon
  };
};

export const addArrayOfPokemon = pokemons => {
  return{
    type: PokemonActionTypes.ADD_ARRAY_OF_POKEMON,
    pokemons
  };
};

export const addArrayOfPokemonType = pokemonsType => {
  return{
    type: PokemonActionTypes.ADD_ARRAY_OF_POKEMON_TYPE,
    pokemonsType
  };
};

export const refreshPokemons = () => {
  return {
    type: PokemonActionTypes.REFRESH_POKEMON
  }
};

export const removePokemon = index => {
  return {
    type: PokemonActionTypes.REMOVE_POKEMON,
    index
  };
};

export const clearPokemon = () => {
  return {
    type: PokemonActionTypes.CLEAR_POKEMON
  };
};
