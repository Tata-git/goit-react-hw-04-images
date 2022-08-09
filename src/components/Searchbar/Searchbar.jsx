import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  SearchbarStyle,
  SearchInputStyle,
  SearchButtonStyle,
  SearchFormStyle,
} from './Searchbar.styled.js';
import { useState } from 'react';

export const Searchbar = ({ onSubmitApp }) => {
  const [queryValue, setQueryValue] = useState('');

  const handleChange = e => {
    setQueryValue(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (queryValue.trim() === '') {
      alert('Enter query');
      return;
    }

    onSubmitApp(queryValue);
    setQueryValue('');
  };

  return (
    <SearchbarStyle>
      <SearchFormStyle onSubmit={handleSubmit}>
        <SearchButtonStyle type="submit" disabled={queryValue === ''}>
          <span>
            <FaSearch />
          </span>
        </SearchButtonStyle>

        <SearchInputStyle
          value={queryValue}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchFormStyle>
    </SearchbarStyle>
  );
};

Searchbar.propTypes = {
  onSubmitApp: PropTypes.func.isRequired,
};
