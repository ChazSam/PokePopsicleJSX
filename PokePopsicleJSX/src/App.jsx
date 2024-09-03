import { useState, useEffect } from 'react'
import './App.css'
import PokePopsicle from './pages/PokePopsicle'

function App() {
  const [pokeData, setPokeData] = useState([])

  useEffect(() =>{
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")
    
      .then (r => r.json())
      .then(data => setPokeData(data.results))
      .catch(error => console.error('Error fetching data:', error))
  },[])
  console.log(pokeData[0]?.name)
  return (
    <>
      <header>PokeMon Popsicle Creator</header>
      <PokePopsicle pokeData={pokeData}/>
    </>
  )
}

export default App
