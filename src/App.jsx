import { useEffect, useState } from "react";
import "./app.css";
import Response from "./Response";

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [Guess, setGuess] = useState("");
  const [stats, setStats] = useState({ right: 0, wrong: 0 });
  const [tried, setTried] = useState(0);

  async function getRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * 1025) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getRandomPokemon();
  }, []);

  function guess() {
    if (Guess.toLocaleLowerCase() === pokemon.name.toLocaleLowerCase()) {
      alert("Correct!");
      setStats({ ...stats, right: stats.right + 1 });
      newGame();
    } else {
      setTried((prev) => prev + 1);
      if (tried >= 5) {
        alert(
          "You have reached the maximum number of tries. The right answer was " +
            pokemon.name
        );
        setStats({ ...stats, wrong: stats.wrong + 1 });
      }
    }
    setGuess("");
  }

  function newGame() {
    getRandomPokemon();
    setTried(0);
  }

  return (
    <div className="w-1/2 border border-gray-500 flex flex-col justify-center items-center h-screen mx-auto semi-transparent">
      {pokemon ? (
        <div>
          {tried >= 6 ? <Response pokemon={pokemon} /> : null}
          <h2>Abilities :</h2>
          {tried >= 1
            ? pokemon.abilities.map((ability) => (
                <p key={ability.ability.name}>{ability.ability.name}</p>
              ))
            : "unlocked after 1 try"}

          <h2>Stats : </h2>
          {tried >= 2
            ? pokemon.stats.map((stat) => (
                <p key={stat.stat.name}>
                  {stat.stat.name} : {stat.base_stat};
                </p>
              ))
            : "unlocked after 2 tries"}

          <h2>Height :</h2>
          {tried >= 3 ? (
            <p>{pokemon.height * 10}cm</p>
          ) : (
            "unlocked after 3 tries"
          )}

          <h2>Weight :</h2>
          {tried >= 3 ? (
            <p>{pokemon.weight / 10}kg</p>
          ) : (
            "unlocked after 3 tries"
          )}

          <h2>First Apparition :</h2>
          {tried >= 4 ? (
            <p>
              {pokemon.game_indices[0] !== undefined
                ? pokemon.game_indices[0].version.name
                : "unknown"}
            </p>
          ) : (
            "unlocked after 4 tries"
          )}

          <h2>Types :</h2>
          {tried >= 5
            ? pokemon.types.map((type) => (
                <p key={type.type.name}>{type.type.name}</p>
              ))
            : "unlocked after 5 tries"}
          <br />
          <input
            type="text"
            placeholder="Guess"
            onChange={(e) => setGuess(e.target.value)}
            value={Guess}
            className="border border-gray-500 p-2 bg-transparent"
          />
          <button onClick={guess} className="p-2 hover:bg-green-400">
            Guess
          </button>
          <p>
            You have tried {tried} times. You have {6 - tried - 1} tries left.
          </p>
          <p>
            Right: {stats.right} Wrong: {stats.wrong}
          </p>
          <br />
          {tried >= 6 ? (
            <button
              onClick={newGame}
              className="bg-green-600 p-4 hover:bg-green-900"
            >
              New Game
            </button>
          ) : null}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
