import React, { useState } from 'react'
// Style
import './index.css';
// Store
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCityAction } from '../../store/actions';
// Services
import * as weatherService from "../../services/weather-service/weatherService";
// Components
import SearchInput from '../../components/search-Input';
import ForecastsPanel from '../../components/forecasts-panel';
import Message from '../../components/message';

const Home = () => {
  const dispatch = useDispatch();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const selectedCity = useSelector(state => state.selectedCity);
  const [error, setError] = useState(false);

  const handleSearch = async event => {
    const enterKey = 'Enter';
    if (event.key !== enterKey) {
      const pressedKey = event.key;
      const inputValue = event.target.value;
      const query = `${inputValue}${pressedKey}`;
      const res = await weatherService.autocomplete(query);
      if (res.name && res.name === 'Error') {
        setError(res.message);
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
      {error && <Message type="error" text={error} />}
      <ForecastsPanel />
    </div>
  )
}

export default Home;
