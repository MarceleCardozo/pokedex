import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../../services';
import axios from 'axios';
import { Pokemon } from '../../../types/pokemonType';

export interface PokemonsState {
  pokemons: Pokemon[];
  loading: boolean;
  page: number;
  pages: number;
  favoritePokemonIds: number[];
  pokedexPage: number;
}

const initialState: PokemonsState = {
  pokemons: [],
  loading: false,
  page: 1,
  pages: 0,
  favoritePokemonIds: [],
  pokedexPage: 1
};

export const getPokemons = createAsyncThunk('/pokemon/getAll', async (page: number) => {
  const response = await api.get(`/pokemon?limit=20&offset=${(page - 1) * 20}`);

  const promises = response.data.results.map((pokemon: any) => {
    return axios.get(pokemon.url);
  });

  const result = await Promise.all(promises);

  const data = result.reduce((acc, val) => {
    acc.push(val.data);
    return acc;
  }, []);

  return {
    pages: parseInt((response.data.count / 20).toFixed(0)),
    data
  };
});

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload;
      const isFavorite = state.favoritePokemonIds.includes(pokemonId);

      if (isFavorite) {
        state.favoritePokemonIds = state.favoritePokemonIds.filter((id) => id !== pokemonId);
      } else {
        state.favoritePokemonIds.push(pokemonId);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemons.pending, (state) => {
      state.loading = true;
      return state;
    });
    builder.addCase(getPokemons.rejected, (state) => {
      state.loading = false;
      console.log('Erro no getPokemons');
    });
    builder.addCase(getPokemons.fulfilled, (state, action) => {
      state.loading = false;
      state.pokemons = action.payload.data;
      state.pages = action.payload.pages;
      return state;
    });
  }
});

export const { setPage, toggleFavorite } = pokemonsSlice.actions;
export default pokemonsSlice.reducer;
