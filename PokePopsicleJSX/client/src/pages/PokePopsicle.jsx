import { useEffect, useState } from "react";
import popRed from "../assets/pop red.jpg";
import popOrange from "../assets/pop orange.jpg";
import popYellow from "../assets/pop yellow.jpg";
import popGreen from "../assets/pop green.jpg";
import popBlue from "../assets/pop blue.jpg";
import popPurple from "../assets/pop purple.jpg";
import popRainbow from "../assets/pop rainbow.jpg";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

function PokePopsicle({ pokeData }) {
  const [selectPopsicle, setSelectPopsicle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pokemonSprite, setPokemonSprite] = useState("")

  const popsiclePics = [
    { label: "Red", src: popRed },
    { label: "Orange", src: popOrange },
    { label: "Yellow", src: popYellow },
    { label: "Green", src: popGreen },
    { label: "Blue", src: popBlue },
    { label: "Purple", src: popPurple },
    { label: "Rainbow", src: popRainbow },
  ];

  const formSchema = yup.object().shape({
    pokemon: yup.string().required("Please select a Pokemon"),
    color: yup.string().required("Please select a popsicle color"),
    email: yup.string().required("Please enter your email"),
    setup: yup.string(),
    punchline: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      pokemon: "",
      color: "",
      name: "",
      email: "",
      setup: "",
      punchline: "",
    },

    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/ordersResponse", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => r.json())
        .then((data) => console.log("Success:", data))
        .catch((err) => console.error("Error:", err));
    },
  });

  function handleSelectPokemon(e){

    const selectedUrl = e.target.value;
    // console.log(selectedUrl)
    if (!selectedUrl) return;

    fetch(selectedUrl)
      .then((r) => r.json())
      .then((data) => {
        formik.setFieldValue("pokemon", data.name)
        setPokemonSprite(data.sprites.front_default)
      })
      .catch((err) => console.error("Error fetching Pokémon:", err))
  }




  function handlePopsicleColor(e) {
    formik.values.color = e.target.value;
    const selected = popsiclePics.find((p) => p.label === formik.values.color)
    setSelectPopsicle(selected.src);
  }

  function generateJoke() {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((r) => r.json())
      .then((item) => {
        formik.values.setup = item.setup,
        formik.values.punchline = item.punchline,
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }
  console.log(formik.values)

  return (
    <>
      <form >
        <div className="bg-blue-300  font-bold text-2xl ">
          <div>
            <h1 className="text-center ">PokéPop Page</h1>
            <h2>Choose your Pokémon</h2>

            <select id="pokemon"  onChange={handleSelectPokemon} >
              <option>Select a Pokémon</option>
              {pokeData.map((pokemon, index) => (
                <option key={pokemon.name} value={pokemon.url} >
                  {pokemon.name.charAt(0).toUpperCase() +
                    pokemon.name.substring(1).toLowerCase()}{" "}
                  -- #
                  {index < 999
                    ? ("00" + parseInt(index + 1)).slice(-3)
                    : parseInt(index + 1)}
                </option>
              ))}
            </select>

            <p></p>
            
            {pokemonSprite && (
              <img
                src={pokemonSprite}
                alt={formik.values.pokemon}
                style={{ width: "200px" }}
              />
            )}
          </div>


          <div>
            <h1>Popsicle Colors</h1>
            <h2>Select a Color</h2>

            <select id="selectPopsicle" onChange={handlePopsicleColor}>
              <option>select a color</option>
              {popsiclePics.map((popsicle, index) => (
                <option key={index} value={popsicle.url}>
                  {popsicle.label}
                </option>
              ))}
            </select>
            <p></p>
            {selectPopsicle && (
              <img src={selectPopsicle} style={{ width: "100px" }} />
            )}
          </div>

          <div>
            <h2>Add a joke? (optional)</h2>
            <p>Joke</p>
            <input
              id="setup"
              value={formik.values.setup}
              onChange={formik.handleChange}
            ></input>
            <p></p>
            <p>Punchline</p>
            <input
              id="punchline"
              value={formik.values.punchline}
              onChange={formik.handleChange}
            ></input>
            <p></p>

            {/* {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>{formik.values.setup}</p>
                <p>{formik.values.punchline}</p>
              </>
            )} */}

            <button type="button" onClick={generateJoke}>
              Random Joke
            </button>
            <p></p>
            {/* <button type="button" onClick={clearJoke}>Clear</button> */}
          </div>
          <div>
            <div>
              <h1>Name</h1>
              <input
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              ></input>
            </div>
            <div>
              <h1>Email</h1>
              <input
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PokePopsicle;
