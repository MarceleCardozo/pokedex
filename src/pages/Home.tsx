import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPokemons } from '../store/modules/pokemons/pokemonsSlice';

const Home: React.FC = () => {
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return <>{JSON.stringify(pokemonsRedux)}</>;
};

export default Home;
