import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../services';
import axios from 'axios';
import { Pokemon } from '../../../types/pokemonType';

export interface PokemonsState {
  pokemons: Pokemon[];
  loading: boolean;
}

const initialState: PokemonsState = {
  pokemons: [],
  loading: false
};

export const getPokemons = createAsyncThunk('/pokemon/getAll', async () => {
  const response = await api.get('/pokemon?limit=20&offset=0');

  console.log(response.data.results, '###');

  const promises = response.data.results.map((pokemon: any) => {
    return axios.get(pokemon.url);
  });

  const result = await Promise.all(promises);

  return result.reduce((acc, val) => {
    acc.push(val.data);
    console.log(acc);
    return acc;
  }, []);
});

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPokemons.pending, (state) => {
      state.loading = true;
      return state;
    });
    builder.addCase(getPokemons.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemons = action.payload;

      console.log(action.payload);

      return state;
    });
  }
});

export default pokemonsSlice.reducer;
