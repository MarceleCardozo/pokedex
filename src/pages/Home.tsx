import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPokemons } from '../store/modules/pokemons/pokemonsSlice';

const Home: React.FC = () => {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <ul>
      {pokemonsRedux.map((pokemon) => (
        <li key={pokemon.id}>
          <p>Name: {pokemon.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default Home;
