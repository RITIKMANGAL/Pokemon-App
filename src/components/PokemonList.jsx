import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemons }) => (
  <div className="pokemon-list">
    {pokemons.map(pokemon => (
      <PokemonCard
        key={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
      />
    ))}
  </div>
);

export default PokemonList;