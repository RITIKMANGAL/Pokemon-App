import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar';
import './App.css'; // Ensure you have CSS for styling

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50');
        const pokemonsData = await Promise.all(response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            id: pokemonDetails.data.id,
            name: pokemonDetails.data.name,
            image: pokemonDetails.data.sprites.front_default
          };
        }));
        setPokemons(pokemonsData);
        setFilteredPokemons(pokemonsData);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemons]);

  return (
    <div className="app">
      <h1>Pokémon List</h1>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export default App;