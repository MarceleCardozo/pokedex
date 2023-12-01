import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPokemons, setPage } from '../store/modules/pokemons/pokemonsSlice';
import PokemonCard from '../components/pokemonCard';
import { Grid, LinearProgress, Pagination } from '@mui/material';
import NavBar from '../components/navbar';

const Home: React.FC = () => {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPokemons(pokemonsRedux.page));
  }, [dispatch, pokemonsRedux.page]);

  if (pokemonsRedux.loading) {
    return <LinearProgress color="secondary" />;
  }

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
          <Pagination
            color="secondary"
            page={pokemonsRedux.page}
            onChange={(e, v) => dispatch(setPage(v))}
            count={pokemonsRedux.pages}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
