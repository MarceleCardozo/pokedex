import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../services';

interface PokemonState {
  id: string;
  name: string;
}

const initialState: PokemonState[] = [];

export const getPokemons = createAsyncThunk('/pokemon', async () => {
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
  reducers: {
    clearState: () => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemons.pending, (state) => {
      console.log('pending');
      return state;
    });
    builder.addCase(getPokemons.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { clearState } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
