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
  const [pokemonSprite, setPokemonSprite] = useState("");

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
      fetch("http://localhost:5555/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((r) => r.json())
        .then((data) => console.log("Success:", data))
        .catch((err) => console.error("Error:", err));
    },
  });

  function handleSelectPokemon(e) {
    const selectedUrl = e.target.value;
    if (!selectedUrl) return;

    fetch(selectedUrl)
      .then((r) => r.json())
      .then((data) => {
        formik.setFieldValue("pokemon", data.name);
        setPokemonSprite(data.sprites.front_default);
      })
      .catch((err) => console.error("Error fetching Pokémon:", err));
  }

  function handlePopsicleColor(e) {
    formik.values.color = e.target.value;
    const selected = popsiclePics.find((p) => p.label === formik.values.color);
    setSelectPopsicle(selected.src);
  }

  function generateJoke() {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((r) => r.json())
      .then((item) => {
        (formik.values.setup = item.setup),
          (formik.values.punchline = item.punchline),
          setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }
  console.log(formik.values);

  return (
    <>
      <form className="text-center" onSubmit={formik.handleSubmit}>
        <header className="bg-blue-500 text-6xl ">
          Pokémon Popsicle Creator
        </header>
        <section className="bg-white bg-opacity-50 ">
          <div>
            <h2>Choose a Pokémon</h2>

            <select id="pokemon" onChange={handleSelectPokemon}>
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
          </div>

          <div>
            <h2>Add a joke? (optional)</h2>
            <p>Joke</p>
            <input
              id="setup"
              value={formik.values.setup}
              onChange={formik.handleChange}
            ></input>
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
        </section>

        <section className="bg-yellow-100 bg-opacity-50 object-contain ">
          {selectPopsicle && (
          <div className="relative">
            <img src={selectPopsicle}  className="relative w-32"/>
            
          {pokemonSprite && (
            <img
            src={pokemonSprite}
            alt={formik.values.pokemon}
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full" 
          
            />
          )}
          </div>
          )}
        </section>

        <button type="submit">Submit</button>
      </form>
      <footer></footer>
    </>
  );
}

export default PokePopsicle;
