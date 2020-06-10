import React from 'react';

// Material
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

const SearchInput = ({ options, defaultOption, label, cssClass, search, inputChanged }) => (
  <Autocomplete
    freeSolo
    clearOnEscape={true}
    className={cssClass}
    options={options}
    defaultValue={defaultOption}
    onKeyPress={(e) => search(e)}
    onChange={(e, value) => inputChanged(value)}
    renderInput={(params) => (
      <TextField {...params} label={label} margin="normal" variant="outlined" />
    )}
  />
);

export default SearchInput;
