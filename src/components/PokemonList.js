import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { CardPokemon } from './CardPokemon'
import { Loader } from './Loader'

export const PokemonList = () => {
    const { fiftyPokemons, loading, filterPokemon } = useContext(PokemonContext)
    return (
        <>
            {loading ? (<Loader />) :
                (<div className='card-list-pokemon container'>
                    {filterPokemon.length ? (
                        <>
                            {filterPokemon.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id} />)}
                        </>
                    ) : (
                        <>
                            {fiftyPokemons.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id} />)}
                        </>
                    )}
                </div>)}
        </>
    )
}
