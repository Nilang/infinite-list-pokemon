import * as PokemonActionTypes from '../actiontypes/pokemon';

export const addPokemon = pokemon => {
  return {
    type: PokemonActionTypes.ADD_POKEMON,
    pokemon
  };
};

export const removePokemon = index => {
  return {
    type: PokemonActionTypes.REMOVE_POKEMON,
    index
  };
};
