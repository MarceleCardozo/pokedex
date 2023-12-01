import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPokemons } from '../store/modules/pokemons/pokemonsSlice';
import PokemonCard from '../components/pokemonCard';
import { Grid, Pagination } from '@mui/material';
import NavBar from '../components/navbar';
import BasicPagination from '../components/basicPagination';

const Home: React.FC = () => {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  useEffect(() => {
    console.log(pokemonsRedux);
  }, [pokemonsRedux]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ margin: '0 auto', maxWidth: '1200px' }}>
        {pokemonsRedux.pokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12} display={'flex'} justifyContent={'center'} margin={'30px'}>
          <BasicPagination />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
