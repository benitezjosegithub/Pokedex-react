import React, { useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { FilterBar, PokemonList } from '../components'
import { PokemonContext } from '../context/PokemonContext'

export const HomePage = () => {
  const { onClickLoadMore, active, setActive } = useContext(PokemonContext)
  return (
    <>
      <div className='container-filter container'>
        <div className='icon-filter' onClick={() => setActive(!active)}>
         
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <span>Filter</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <FilterBar />
            </Dropdown.Menu>
          </Dropdown>

        </div>
      </div>
      <PokemonList />


      <div className='container-btn-load-more container'>
        <button className='btn-load-more' onClick={onClickLoadMore}>
          Load more
        </button>
      </div>
    </>
  )
}
