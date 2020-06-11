import React, { useState } from 'react';

// Material
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const SearchInput = ({ options, value, label, cssClass, onSearch, onInputChanged  }) => (
  <Autocomplete
    freeSolo
    clearOnEscape={true}
    className={cssClass}
    options={options}
    value={value}
    onKeyPress={(e) => onSearch(e)}
    onChange={(e, value) => onInputChanged(value)}
    renderInput={(params) => (
      <TextField {...params} label={label} margin="normal" variant="outlined" />
    )}
  />
);

export default SearchInput;
