import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useLocation } from 'react-router-dom';
import { CardPokemon } from '../components';

export const SearchPage = () => {
  const location = useLocation();
  const {allPokemons} = useContext(PokemonContext);
  const filterPokemons =allPokemons.filter(pokemon=>pokemon.name.includes(location.state.toLowerCase()));
  return (
    <div className='container'>
      <p className='p-search'>
        <span>{filterPokemons.length}</span> results were found
      </p>
      
      <div className='card-list-pokemon container'>
				{filterPokemons.map(pokemon => (
					<CardPokemon pokemon={pokemon} key={pokemon.id} />
				))}
			</div>
    </div>
  )
}
