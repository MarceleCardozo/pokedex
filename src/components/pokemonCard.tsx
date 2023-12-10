import styled from 'styled-components';
import { Pokemon } from '../types/pokemonType';
import { useCallback, useState } from 'react';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavorite, setFavoritePokemon, removeFavoritePokemon } from '../store/modules/pokemons/pokemonsSlice';

const StyledCard = styled.article`
  width: 250px;
  background: white;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  perspective: 1000px;
  transform-style: preserve-3d;

  &:hover {
    transform: scale(1.05) rotateY(5deg);
  }

  &.flipped {
    transform: rotateY(180deg);
  }
`;

const StyledHeader = styled.div`
  background: rgba(64, 224, 208, 0.419);
  height: 40px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-weight: bold;
  color: rgba(13, 82, 75, 0.419);

  .star-icon {
    cursor: pointer;
    margin-left: 8px;
  }
`;

const StyledMain = styled.div`
  background: rgba(102, 51, 153, 0.323);
  height: 190px;
  text-align: center;
  padding: 30px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }

  transform: rotateY(0deg);
  backface-visibility: hidden;
`;

const StyledStats = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin: 0px;
  }
`;

const StyledBack = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  padding: 5px;
`;

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(65, 105, 225, 0.399);
  height: 50px;
  padding: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  text-transform: uppercase;
  font-weight: bold;
  color: rgba(6, 32, 110, 0.399);
`;

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const dispatch = useAppDispatch();
  const isFavorited = useAppSelector((state) => state.pokemons.favoritePokemonIds.includes(pokemon.id));
  const pokemonsRedux = useAppSelector((state) => state.pokemons);
  const favoritedPokemons = pokemonsRedux.favoritedPokemons || [];

  const [isFlipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped(!isFlipped);
  };

  const handleStarClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const isPokemonFavorited = favoritedPokemons.some((favoritePokemon) => favoritePokemon.id === pokemon.id);

      if (isPokemonFavorited) {
        dispatch(removeFavoritePokemon(pokemon));
      } else {
        dispatch(setFavoritePokemon(pokemon));
        dispatch(toggleFavorite(pokemon.id));
      }
    },
    [dispatch, favoritedPokemons, pokemon]
  );

  return (
    <StyledCard onClick={handleCardClick} className={isFlipped ? 'flipped' : ''}>
      <StyledHeader>
        ID: {pokemon.id}
        <div className="star-icon" onClick={handleStarClick}>
          {isFavorited ? <StarIcon /> : <StarBorderIcon />}
        </div>
      </StyledHeader>
      {isFlipped ? (
        <StyledBack>
          <StyledStats>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p>Stats:</p>
            {pokemon.stats.map((stat, index) => (
              <p key={index}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
          </StyledStats>
        </StyledBack>
      ) : (
        <StyledMain>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </StyledMain>
      )}
      <StyledFooter>{pokemon.name}</StyledFooter>
    </StyledCard>
  );
}
