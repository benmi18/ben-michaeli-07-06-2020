import React, { useState, useEffect } from 'react'
// Style
import './index.css';
// Store
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCityAction } from '../../store/actions';
// Services
import * as weatherService from "../../services/weather-service";
import * as geolocationService from "../../services/geolocation-service";
import { geolocationError, autocompleteError, geolocationBlockedError } from '../../helpers';
// Components
import SearchInput from '../../components/search-Input';
import ForecastsPanel from '../../components/forecasts-panel';
import Message from '../../components/message';

const Home = () => {
  const dispatch = useDispatch();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const selectedCity = useSelector(state => state.selectedCity);
  const [error, setError] = useState({ isError: false, message: '' });

  useEffect(() => {
    geolocationService.getGeoLocation(successGeolocation, errorGeolocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successGeolocation = async ({ coords: { latitude, longitude } }) => {
    if (!selectedCity.redirectFromFavorite) {
      const res = await weatherService.geolocation(latitude, longitude);
      if (res.name && res.name === 'Error') {
        setError({ isError: true, message: geolocationError });
        return;
      }
      dispatch(setSelectedCityAction(res.data));
    }
  }

  const errorGeolocation = async (error) => {
    setError({isError: true, message: geolocationBlockedError});
  }

  const handleSearch = async event => {
    const enterKey = 'Enter';
    if (event.key !== enterKey) {
      const pressedKey = event.key;
      const inputValue = event.target.value;
      const query = `${inputValue}${pressedKey}`;
      const res = await weatherService.autocomplete(query);
      if (res.name && res.name === 'Error') {
        setError({ isError: true, message: autocompleteError });
        return;
      }
      setAutoCompleteOptions(res.data);
    }
  }

  const handleInputChange = (cityName) => {
    const selectedCityObject = autoCompleteOptions.find(option => option.LocalizedName === cityName);
    selectedCityObject && dispatch(setSelectedCityAction(selectedCityObject));
  }

  return (
    <div className="home-page">
      <SearchInput
        options={autoCompleteOptions.map(city => city.LocalizedName)}
        value={selectedCity.LocalizedName}
        label="Search City"
        cssClass={'search-input'}
        onSearch={handleSearch}
        onInputChanged={handleInputChange}
      />
      {error.isError &&
        <Message
          isOpen={error.isError}
          handleOnClose={() => setError({ isError: false, message: '' })}
          className="error-message"
          autoHideDuration={2500}
          type="error"
          text={error.message}
        />
      }
      <ForecastsPanel />
    </div>
  )
}

export default Home;
