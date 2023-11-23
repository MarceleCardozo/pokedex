import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../services';

export interface PokemonsState {
  pokemons: any;
  loading: boolean;
}

const initialState: PokemonsState = {
  pokemons: [],
  loading: false
};

export const getPokemons = createAsyncThunk('/pokemon/getPokemons', async () => {
  const response = await api.get('/pokemon');

  console.log(response.data.results);

  if (response.status === 200) {
    return response.data.results;
  }

  return [];
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
      return state;
    });
  }
});

export default pokemonsSlice.reducer;
