import { useState } from "react"


function PokePopsicle({pokeData}){

    const [ selectedPokemon, setSelectedPokemon] = useState(null)

    return(
        <>
        <h1>PokéPop Page</h1>
        <h2>Choose your Pokémon</h2>
        <select>
            <option>Select a Pokémon</option>
                {pokeData.map((pokemon, index)=>(
                    <option key = {pokemon.name} value = {parseInt(index + 1)}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase()} -- #{
                        index < 999 ? ("00" + parseInt(index + 1)).slice(-3) : parseInt(index + 1)
                        }</option>
                ))}
        </select>
        <button>Select</button>
        
        </>
    )
}

export default PokePopsicle