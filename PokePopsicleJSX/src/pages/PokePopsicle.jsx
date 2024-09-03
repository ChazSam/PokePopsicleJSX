import { useState } from "react"


function PokePopsicle({pokeData}){


    return(
        <>
        <h1>PokePop Page</h1>
        <h2>{pokeData[0]?.name}</h2>
        
        </>
    )
}

export default PokePopsicle