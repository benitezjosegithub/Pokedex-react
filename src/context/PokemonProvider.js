import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hook/useForm";


export const PokemonProvider = ({ children }) => {
    const URLBase = 'https://pokeapi.co/api/v2/';
    const [fiftyPokemons, setfiftyPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [allType, setAllType] = useState([]);

    // Utilizar CustomHook - useForm
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: '',
    });

    //Estado app simple
    const [loading, setLoading] = useState(true);
    const [active, setActive] = useState(false);

    //trae 50 pokemones de la api
    const getPokemons = async (limit = 50) => {

        const res = await fetch(`${URLBase}pokemon?limit=${limit}&offset=${offset}`);
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })

        const result = await Promise.all(promises);
        setfiftyPokemons([
            ...fiftyPokemons,
            ...result
        ]);
        setLoading(false);
    }

    // traer todos los pokemons
    const getAllPokemon = async () => {
        const res = await fetch(`${URLBase}pokemon?limit=100000&offset=0`);
        const data = await res.json();
        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const data = await res.json();
            return data;
        })
        const result = await Promise.all(promises);
        setAllPokemons(result);
        setLoading(false);
    }

    //trae pokemon por id
    const getPokemonById = async (id) => {
        const res = await fetch(`${URLBase}pokemon/${id}`);
        const data = await res.json();
        return data;
    }

    //trae todos los tipos
    const getType = async () => {
        const res = await fetch(`${URLBase}type`);
        const data = await res.json();
        setAllType(
            data.results
        );
        setLoading(false);
    }

    //btn cargar mas
    const onClickLoadMore = () => {
        setOffset(offset + 50);
    }

    //filtrar funcion
    const [typeSelected, settypeSelected] = useState({
        normal: false,
        fighting: false,
        flying: false,
        poison: false,
        ground: false,
        rock: false,
        bug: false,
        ghost: false,
        steel: false,
        fire: false,
        water: false,
        grass: false,
        electric: false,
        psychic: false,
        ice: false,
        dragon: false,
        dark: false,
        fairy: false,
        unknown: false,
        shadow: false,
    })
    const [filterPokemon, setfilterPokemon] = useState([]);

    const handleCheckbox = e => {
        settypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        })
        if (e.target.checked) {
            const filterResults = allPokemons.filter(pokemon =>
                pokemon.types
                    .map(type => type.type.name)
                    .includes(e.target.name)
            );
            console.log(filterResults.length)
            if(filterPokemon.length>0){
                filterPokemon.forEach(pokemon =>{
                    let i=0;
                    filterResults.forEach(pokeres=>{
                        if (pokemon.id===pokeres.id) {
                            filterResults.splice(i,1);
                        }
                        i++;                        
                    })
                })
            }
            setfilterPokemon([...filterPokemon,...filterResults]);
        } else {
            const filterResults = filterPokemon.filter(
                pokemon =>
                    !pokemon.types
                        .map(type => type.type.name)
                        .includes(e.target.name)
            );
            setfilterPokemon([...filterResults]);
        }
    }


    const [pokemonEvo, setpokemonEvo] = useState([])

    //filtra pokemons por evolucion
    const getEvo = (data, res = []) => {
        if (data[0].evolves_to.length !== 0) {
            if (data[0].evolves_to.length > 1) {
                data[0].evolves_to.map(async (ele) => {
                    const fil = allPokemons.filter(pokemon => pokemon.name === ele.species.name);
                    res = [...res, ...fil];
                    console.log(fil);
                }).then(setpokemonEvo([...res]))

            } else {
                const fil = allPokemons.filter(pokemon => pokemon.name === data[0].species.name);
                res = [...res, ...fil];
                getEvo([data[0].evolves_to[0]], res);
            }

        }
        else {
            const fil = allPokemons.filter(pokemon => pokemon.name === data[0].species.name);
            res = [...res, ...fil];
            setpokemonEvo([...res]);
        }

    }

    //trae las evoluciones
    const getEvolutions = async (url) => {

        const species = await fetch(url);
        const dataSpecies = await species.json();
        const evolution = await fetch(dataSpecies.evolution_chain.url);
        const dataEvolution = await evolution.json();
        getEvo([dataEvolution.chain]);

        setLoading(false);
    }

    useEffect(() => {
        getPokemons()
    }, [offset])

    useEffect(() => {
        getAllPokemon();
        getType();
    }, [])

    return (
        <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            fiftyPokemons,
            allPokemons,
            getPokemonById,
            onClickLoadMore,
            loading,
            setLoading,
            active,
            setActive,
            allType,
            handleCheckbox,
            filterPokemon,
            getEvolutions,
            pokemonEvo
        }}>
            {children}
        </PokemonContext.Provider>
    )
}
