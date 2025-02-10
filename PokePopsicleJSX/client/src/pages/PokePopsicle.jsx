import { useState } from "react";
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
  // const [selectedPokemon, setSelectedPokemon] = useState({});
  const [pokemon, setPokemon] = useState(null);
  const [selectPopsicle, setSelectPopsicle] = useState(null);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [joke, setJoke] = useState({
  //   setup: "",
  //   punchline: "",
  // });

  const [loading, setLoading] = useState(false);

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
    selectPopsicle: yup.string().required("Please select a popsicle color"),
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

  // function handleClick(e) {
  //   fetch(e)
  //     .then((r) => {
  //       if (!r.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return r.json();
  //     })
  //     .then((pokemon) => {
  //       setPokemon(pokemon);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching Pokémon data:", error);
  //     });
  // }

  function handleSelectChange(e) {
     formik.values.color = e.target.value;
    const selected = popsiclePics.find((p) => p.label === formik.values.color);
    setSelectPopsicle(selected.src);
  }

  function generateJoke() {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then((r) => r.json())
      .then((item) => {
        ({
          // formik.values.setup: item.setup,
          // formik.values.punchline: item.punchline,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }

  function clearJoke() {
    formik.values({
      setup: "",
      punchline: "",
    });
  }

  return (
    <>
      <form onSubmit={console.log(formik.values)}>
        <div className="bg-blue-300  font-bold text-2xl ">
          <div>
            <h1 className="text-center ">PokéPop Page</h1>
            <h2>Choose your Pokémon</h2>
            <select
              id="selectPokemon"
              onChange={formik.handleChange}
            >
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
            <button type="button" onChange={formik.handleChange} value={formik.values.pokemon}>Select</button>
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

            <button type="button" onClick={() => console.log(selectPopsicle)}>Select</button>
            <p></p>
            {selectPopsicle && (
              <img src={selectPopsicle} style={{ width: "100px" }} />
            )}
          </div>

          <div>
            <h1>Jokes</h1>
            <h2>Add a joke?</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p>{formik.values.setup}</p>
                <p>{formik.values.punchline}</p>
              </>
            )}

            <button type="button" onClick={generateJoke}>Random Joke</button>
            <button type="button" onClick={clearJoke}>clear</button>
          </div>
          <div>
            <div>
              <h1>Name</h1>
              <input id="name" value={formik.values.name} onChange={formik.handleChange}></input>
              
         
            </div>
            <div>
              <h1>Email</h1>
              <input id="email" value={formik.values.email} onChange={formik.handleChange}></input>
              
              
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PokePopsicle;
