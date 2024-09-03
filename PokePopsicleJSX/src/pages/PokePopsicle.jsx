import { useState } from "react"


function PokePopsicle({pokeData}){


    return(
        <>
        <h1>PokéPop Page</h1>
        <h2>{pokeData[0]?.name}</h2>
        <select>
            <option>select a pokémon</option>
                {pokeData.map((pokemon)=>(
                    <option>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase()}</option>
                ))}
        </select>
        
        </>
    )
}

export default PokePopsicle