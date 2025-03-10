import { useState, useEffect } from "react";
import "./App.css";
import PokePopsicle from "./pages/PokePopsicle";

function App() {
  const [pokeData, setPokeData] = useState([]);

  useEffect(() =>{
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1025")

      .then (r => r.json())
      .then(data => setPokeData(data.results))
      .catch(error => console.error('Error fetching data:', error))
  },[])

  return (
    <div>
      <PokePopsicle pokeData={pokeData} />
    </div>
  );
}

export default App;
