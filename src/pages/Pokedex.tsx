import { Grid, LinearProgress, Typography } from '@mui/material';
import NavBar from '../components/navbar';
import { useAppSelector } from '../store/hooks';
import PokemonCard from '../components/pokemonCard';

const Pokedex: React.FC = () => {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const favoritedPokemons = pokemonsRedux.favoritedPokemons || [];

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
        {favoritedPokemons.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="h6" color="secondary" align="center">
              Nenhum Pokémon favoritado.
            </Typography>
          </Grid>
        ) : (
          favoritedPokemons.map((pokemon) => (
            <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default Pokedex;
