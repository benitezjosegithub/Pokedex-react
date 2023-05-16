import React, { useContext, useEffect, useState } from 'react'
import { PokemonContext } from '../context/PokemonContext';

export const FilterBar = () => {

    const {active,allType,handleCheckbox} = useContext(PokemonContext);

    // const [allType,setAllType]=useState([]);
    const [loading, setLoading] = useState(true);

  return (
    <div>
        <div className={`container-filters ${active?'active':''}`}>
            <div className='filter-by typre'>
                <span>Type</span>

                {allType.map(type=>(
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
