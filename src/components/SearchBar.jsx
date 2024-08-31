import React from 'react';

const SearchBar = ({ searchTerm, onSearch }) => (
  <input
    type="text"
    value={searchTerm}
    onChange={e => onSearch(e.target.value)}
    placeholder="Search Pokémon"
  />
);

export default SearchBar;
