import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useParams } from 'react-router-dom';
import { CardPokemon, Loader } from '../components';

export const PokemonPage = () => {

  const { getPokemonById, getEvolutions, pokemonEvo } = useContext(PokemonContext);

  const [loading, setloading] = useState(true);
  const [pokemon, setpokemon] = useState({});

  const { id } = useParams()

  const fetchPokemon = async (id) => {
    const data = await getPokemonById(id);
    getEvolutions(data.species.url)
    setpokemon(data);
    setloading(false);
  } 


  useEffect(() => {
    fetchPokemon(id)
  }, [id]);

  return (
    <main className='container main-pokemon'>
      {
        loading ? (
          <Loader />) : (
          <>
            <div className='header-main-pokemon'>
              <span className='number-pokemon'>#{pokemon.id}</span>
              <div className='container-img-pokemon'>
                <img
                  src={pokemon.sprites.other.dream_world.front_default}
                  alt={`Pokemon ${pokemon?.name}`}
                />
              </div>

              <div className='container-info-pokemon'>
                <h1>{pokemon.name}</h1>
                <div className='card-types info-pokemon-type'>
                  {pokemon.types.map(type => (
                    <span key={type.type.name} className={`${type.type.name}`}>
                      {type.type.name}
                    </span>
                  ))}
                </div>
                <div className='info-pokemon'>
                  <div className='group-info'>
                    <p>height</p>
                    <span>{pokemon.height}</span>
                  </div>
                  <div className='group-info'>
                    <p>weight</p>
                    <span>{pokemon.weight}KG</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='container-stats'>
              <h1>Statistics</h1>
              <div className='stats'>
                {
                  pokemon.stats.map(stats => (
                    <div className='stat-group'>
                      <span>{stats.stat.name}</span>
                      <div className='progress-bar'></div>
                      <span className='counter-stat'>
                        {stats.base_stat}
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div>
              <h1>evoliciones</h1>
                {(
                  <div className='card-list-pokemon container'>
                    {pokemonEvo.map(pokemon => <CardPokemon pokemon={pokemon} key={pokemon.id} />)}
                  </div>
                )}
            </div>
          </>)
      }
    </main>
  )
}
