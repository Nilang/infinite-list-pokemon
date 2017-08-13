import * as PokemonActionTypes from '../actiontypes/pokemon';

const initialState = [];

export default function Pokemon(state=initialState, action){
  switch(action.type){
    case PokemonActionTypes.ADD_POKEMON:
    return[
      ...state,
      action.pokemon
    ];

    case PokemonActionTypes.REMOVE_POKEMON:
      return[
        ...state.slice(0,action.index),
        ...state.slice(action.index + 1)
      ];

    case PokemonActionTypes.CLEAR_POKEMON:
      return[];

    default:
      return state;
  }
}
