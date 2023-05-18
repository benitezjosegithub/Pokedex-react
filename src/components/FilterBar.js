import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';

export const FilterBar = () => {

    const { allType, handleCheckbox } = useContext(PokemonContext);

    return (
        <div>
            <div className="container-filters">
                <div className='filter-by typre'>
                    <span>Type</span>

                    {allType.map(type => (
                        <div className='group-type'>
                            <input
                                type='checkbox'
                                onChange={handleCheckbox}
                                name={type.name}
                                id={type.name}
                            />
                            <label htmlFor={type.name}>{type.name}</label>
                        </div>)
                    )}
                </div>
            </div>
        </div>
    )
}
