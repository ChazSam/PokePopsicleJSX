import { useState } from "react"


function PokePopsicle({pokeData}){

    const [ selectedPokemon, setSelectedPokemon] = useState({})
    const [ pokemon, setPokemon] = useState(null)

    function handleClick(e){
        console.log(e)
        fetch(e)
        .then (r => {
            if(!r.ok){
                throw new Error("Network response was not ok");
            }
            return r.json()
        })
        .then ((pokemon) => {
            setPokemon(pokemon)
        })
        .catch((error) => {
            console.error("Error fetching Pokémon data:", error)
        })
    }

   
    return(
        <>
        <h1>PokéPop Page</h1>
        <h2>Choose your Pokémon</h2>
        <select onChange={(e)=>setSelectedPokemon(e.target.value)}>
            <option>Select a Pokémon</option>
                {pokeData.map((pokemon, index)=>(
                    <option key = {pokemon.name} value = {pokemon.url}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase()} -- #{
                        index < 999 ? ("00" + parseInt(index + 1)).slice(-3) : parseInt(index + 1)
                        }</option>
                ))}
        </select>
        <button onClick={()=> handleClick(selectedPokemon)}>Select</button>
        <p></p>
        {pokemon && <img src={pokemon.sprites.front_default} alt={pokemon.name}/> }
        </>
    )
}

export default PokePopsicle