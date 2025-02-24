import React, { useState, useEffect } from "react";
import "./App.css";

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";
const TYPE_API_URL = "https://pokeapi.co/api/v2/type/";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [flavorText, setFlavorText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  useEffect(() => {
    fetch(POKE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const pokemonWithImages = data.results.map((pokemon, index) => ({
          ...pokemon,
          id: index + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
        }));
        setPokemonList(pokemonWithImages);
        setFilteredPokemon(pokemonWithImages);
      })
      .catch((error) => console.error("Error fetching Pokemon data:", error));

    fetch(TYPE_API_URL)
      .then((response) => response.json())
      .then((data) => {
        const filteredTypes = data.results.filter(type => type.name !== "unknown" && type.name !== "shadow");
        setTypes(filteredTypes);
      })
      .catch((error) => console.error("Error fetching types:", error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePokemonClick = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonDetails(data);
        setSelectedPokemon(pokemon);

        return fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
      })
      .then((response) => response.json())
      .then((speciesData) => {
        const englishFlavorText = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        setFlavorText(englishFlavorText ? englishFlavorText.flavor_text : "No description available.");
      })
      .catch((error) => console.error("Error fetching Pokemon details:", error));
  };

  const handleBackClick = () => {
    setSelectedPokemon(null);
    setPokemonDetails(null);
    setFlavorText("");
  };

  const handleTypeChange = async (event) => {
    const type = event.target.value;
    setSelectedType(type);

    if (!type) {
      setFilteredPokemon(pokemonList);
      return;
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      const filteredByType = data.pokemon
        .map((p) => ({
          name: p.pokemon.name,
          id: p.pokemon.url.split("/")[6],
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.pokemon.url.split("/")[6]}.png`
        }))
        .filter((p) => p.id <= 151);

      setFilteredPokemon(filteredByType);
    } catch (error) {
      console.error("Error fetching Pokemon by type:", error);
    }
  };

  return (
    <div className="container">
      {selectedPokemon && pokemonDetails ? (
        <div className="details-container">
          <div className="details-left">
            <h1>{pokemonDetails.name.toUpperCase()}</h1>
            <p><strong>Type:</strong> {pokemonDetails.types.map(type => type.type.name).join(", ")}</p>
            <p><strong>Height:</strong> {pokemonDetails.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemonDetails.weight / 10} kg</p>
            <p><strong>Base Experience:</strong> {pokemonDetails.base_experience}</p>
            <p><strong>Pokédex Entry:</strong> {flavorText}</p>

            <img
              src={pokemonDetails.sprites.other["official-artwork"].front_default}
              alt={pokemonDetails.name}
              className="large-image"
            />
          </div>

          <div className="details-right">
            <h3>Base Stats:</h3>
            <ul className="stats-list">
              {pokemonDetails.stats.map((stat) => (
                <li key={stat.stat.name}>
                  <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
                </li>
              ))}
            </ul>

            <h3>First 10 Moves:</h3>
            <ul className="moves-list">
              {pokemonDetails.moves.slice(0, 10).map((move) => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </div>

          <button onClick={handleBackClick} className="back-button">← Back to Pokedex</button>
        </div>
      ) : (
        <>
          <header className="header">
            <h1>Pokedex</h1>
            <input
              type="text"
              className="search-bar"
              placeholder="Search Pokemon"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select className="filter-dropdown" value={selectedType} onChange={handleTypeChange}>
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name.toUpperCase()}
                </option>
              ))}
            </select>
          </header>
          <div className="flex-container">
            {filteredPokemon
              .filter((pokemon) => pokemon.name.includes(searchTerm))
              .map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card" onClick={() => handlePokemonClick(pokemon)}>
                  <img src={pokemon.image} alt={pokemon.name} />
                  <h3>{pokemon.name}</h3>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
