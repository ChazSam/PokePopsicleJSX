import { useState } from "react";
import popRed from "../assets/pop red.jpg";
import popOrange from "../assets/pop orange.jpg";
import popYellow from "../assets/pop yellow.jpg";
import popGreen from "../assets/pop green.jpg";
import popBlue from "../assets/pop blue.jpg";
import popPurple from "../assets/pop purple.jpg";
import popRainbow from "../assets/pop rainbow.jpg";

function PokePopsicle({ pokeData }) {
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [pokemon, setPokemon] = useState(null);
  const [selectPopsicle, setSelectPopsicle] = useState(null);
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [joke, setJoke] = useState({
    setup: "",
    punchline: ""
  })

  const popsiclePics = [
    { label: "Red", src: popRed },
    { label: "Orange", src: popOrange },
    { label: "Yellow", src: popYellow },
    { label: "Green", src: popGreen },
    { label: "Blue", src: popBlue },
    { label: "Purple", src: popPurple },
    { label: "Rainbow", src: popRainbow },
  ];

  function handleClick(e) {
    fetch(e)
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((pokemon) => {
        setPokemon(pokemon);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon data:", error);
      });
  }

  function handleSelectChange(e) {
    const selectedPopsicle = e.target.value;
    const selected = popsiclePics.find((p) => p.label === selectedPopsicle);
    setSelectPopsicle(selected.src);
  }

  function generateJoke() {
    setLoading(true)
    fetch("https://official-joke-api.appspot.com/jokes/random")
    .then(r => r.json())
    .then(item => {setJoke({
      setup: item.setup,
      punchline: item.punchline

    })
    setLoading(false)
  })
    .catch((error)=>{
      console.error("Error", error)
    })
  }

  function clearJoke(){
    setJoke({
      setup: "",
      punchline: ""
    }
    )
  }

  return (
    <>
      <div>
        <h1>PokéPop Page</h1>
        <h2>Choose your Pokémon</h2>
        <select id="selectPokemon" onChange={(e) => setSelectedPokemon(e.target.value)}>
          <option>Select a Pokémon</option>
          {pokeData.map((pokemon, index) => (
            <option key={pokemon.name} value={pokemon.url}>
              {pokemon.name.charAt(0).toUpperCase() +
                pokemon.name.substring(1).toLowerCase()}{" "}
              -- #
              {index < 999
                ? ("00" + parseInt(index + 1)).slice(-3)
                : parseInt(index + 1)}
            </option>
          ))}
        </select>
        <button onClick={() => handleClick(selectedPokemon)}>Select</button>
        <p></p>
        {pokemon && (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ width: "200px" }}
          />
        )}
      </div>

      <div>
        <h1>Popsicle Colors</h1>
        <h2>Select a Color</h2>

        <select id="selectPopsicle" onChange={handleSelectChange}>
          <option>select a color</option>
          {popsiclePics.map((popsicle, index) => (
            <option key={index} value={popsicle.label}>
              {popsicle.label}
            </option>
          ))}
        </select>

        <button onClick={() => console.log(selectPopsicle)}>Select</button>
        <p></p>
        {selectPopsicle && (
          <img src={selectPopsicle} style={{ width: "100px" }} />
        )}
      </div>

      <div>
        <h1>Jokes</h1>
        <h2>Add a joke?</h2>
        {loading? (
          <p>Loading...</p>
        ) : (
          <>
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
          </>
        )}

        <button onClick={generateJoke}>Random Joke</button>
        <button onClick={clearJoke}>clear</button>
      </div>
      <div>
        <div>

        <h1>Name</h1>
        <input></input>
        <button>Enter</button>
        {name}
        </div>
        <div>
          <h1>Email</h1>
          <input></input>
          <button>Enter</button>
          {email}
        </div>
      </div>
    </>
  );
}

export default PokePopsicle;
