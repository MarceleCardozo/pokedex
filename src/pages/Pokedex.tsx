import { Grid, LinearProgress } from '@mui/material';
import NavBar from '../components/navbar';
import { useAppSelector } from '../store/hooks';
import PokemonCard from '../components/pokemonCard';

const Pokedex: React.FC = () => {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const favoritedPokemonIds = useAppSelector((state) => state.pokemons.favoritePokemonIds);

  const favoritedPokemons = pokemonsRedux.pokemons.filter((pokemon) => favoritedPokemonIds.includes(pokemon.id));

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
        {favoritedPokemons.map((pokemon) => (
          <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Pokedex;
