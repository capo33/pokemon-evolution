import { useEffect, useState } from "react";
import "./App.css";
import PokemonThum from "./components/PokemonThum";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();

        setAllPokemons((preValue) => {
          return [...preValue, data];
        });
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();

    return () => {
      console.log("clean up");
    };
  }, []);
  return (
    <div className="app-container">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.map((pokemon, index) => (
            <PokemonThum
              key={index}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
            />
          ))}
        </div>
        <button onClick={getAllPokemons} className="load-more">
          Load more
        </button>
      </div>
    </div>
  );
}

export default App;
