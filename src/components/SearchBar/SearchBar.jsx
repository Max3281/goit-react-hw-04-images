import React, { useState } from 'react';

function SearchBar({ submit }) {
  const [inputQuery, setInputQuery] = useState('');
  const [searchCheck, setSearchCheck] = useState('');

  const handleChange = e => {
    setInputQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSearchCheck(inputQuery);

    if (searchCheck === inputQuery) {
      return alert('Change a search query');
    }

    if (inputQuery !== '') {
      submit(inputQuery);
      return;
    }

    alert('Enter a search query');
  };

  return (
    <header className="searchbar">
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="search-form__button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="search-form__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default SearchBar;
