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

const Home = () => {
  const dispatch = useDispatch();
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const selectedCity = useSelector(state => state.selectedCity);

  const handleSearch = async event => {
    const enterKey = 'Enter';
    if (event.key !== enterKey) {
      const pressedKey = event.key;
      const inputValue = event.target.value;
      const query = `${inputValue}${pressedKey}`;
      let res;
      try {
        res = await weatherService.autocomplete(query);
      } catch (error) {
        debugger
      }
      debugger;
      setAutoCompleteOptions(res.data);
    }
  }

  const handleInputChange = (cityName) => {
    const selectedCityObject = autoCompleteOptions.find(option => option.LocalizedName === cityName);
    dispatch(setSelectedCityAction(selectedCityObject));
  }

  return (
    <div className="home-page">
      <SearchInput
        options={autoCompleteOptions.map(city => city.LocalizedName)}
        defaultOption={selectedCity.LocalizedName}
        label="Search City"
        cssClass={'search-input'}
        search={handleSearch}
        inputChanged={handleInputChange}
      />
      <ForecastsPanel />
    </div>
  )
}

export default Home;
