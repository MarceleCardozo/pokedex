import { combineReducers } from '@reduxjs/toolkit';
import pokemonsSlice from './pokemons/pokemonsSlice';

export default combineReducers({
  pokemons: pokemonsSlice
});
