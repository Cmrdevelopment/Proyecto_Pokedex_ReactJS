import "./App.css";
import { useState } from "react";
import Axios from "axios";

const App = () => {
  // destructuring para que el input recoja los nombres de los pokemon que deseamos buscar (pokemonName, setPokemonName)
  // useState crea un valor (estado) cuyo valor inicial es pokemonName y lo cambia setPokemonName
  const [pokemonName, setPokemonName] = useState("");
  // useState crea un estado  con valor false cuyo valor inicial es pokemonChosen y lo cambia setPokemonChosen
  const [pokemonChosen, setPokemonChosen] = useState(false);
  // Se crea un estado incial con todos los valores vacios, variable pokemon y la función que cambia el valor es setPokemon
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    // Con el axios hacemos las peticiones a la api de los pokemon pudiendo elegir el pokemon a buscar con los datos que hemos predefinido
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      })
      .catch((error) => {});
  };
  // Creamos el titulo, el input y el botón para buscar los pokemon
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        {/* Creamos el input para poder elegir a los pokemon */}
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          value={pokemonName.toLowerCase()}
        />
        {/* con el botón iniciamos la busqueda del pokemos seleccionado */}
        <button onClick={searchPokemon}>Buscar Pokémon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1 className="pleaseChoose"> Por favor, elige un Pokémon </h1>
        ) : (
          <div className="pokemonInfo">
            {/* pintamos todo lo seleccionado anteriormente en la página*/}
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Number: #{pokemon.number}</h3>
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <h4>Speed: {pokemon.speed}</h4>
          </div>
        )}
        {/* pie de página */}
        <div className="pieCopy">@cmrbolsa - 2023 - Pokédex -</div>
      </div>
    </div>
  );
};
export default App;
