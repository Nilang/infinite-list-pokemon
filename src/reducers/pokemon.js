import * as PokemonActionTypes from '../actiontypes/pokemon';

const initialState = [];

export default function Pokemon(state=initialState, action){
  switch(action.type){
    case PokemonActionTypes.ADD_ARRAY_OF_POKEMON:
      return[
        ...state,
        ...action.pokemons
      ];

    case PokemonActionTypes.ADD_ARRAY_OF_POKEMON_TYPE:
      let pokemons = [];
      for (var i = 0; i < action.pokemonsType.length; i++){
        pokemons.push(action.pokemonsType[i].pokemon);
      }
      return[
        ...state,
        ...pokemons
      ];

    case PokemonActionTypes.ADD_POKEMON:
    return[
      ...state,
      action.pokemon
    ];

    case PokemonActionTypes.CLEAR_POKEMON:
      return[];

    case PokemonActionTypes.REFRESH_POKEMON:
      return state;

    case PokemonActionTypes.REMOVE_POKEMON:
      return[
        ...state.slice(0,action.index),
        ...state.slice(action.index + 1)
      ];

    default:
      return state;
  }
}
