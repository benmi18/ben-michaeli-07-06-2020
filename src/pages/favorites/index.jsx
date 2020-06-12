import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
// Components
import WeatherCard from "../../components/weather-card";
// Services
import * as weatherService from '../../services/weather-service/weatherService'
import { CircularProgress } from '@material-ui/core';
// Style
import './index.css';
import Loader from '../../components/loader';

const Favorites = () => {
  const [favorites, setFavorites] = useState(useSelector(state => state.favorites));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchConditions = () => {
    // TODO: uncomment
    // favorites.length ?
    //   Promise.all(favorites.map(async x => ({
    //     ...x,
    //     ...(await weatherService.currentConditions(x.Key)).data[0]
    //   })))
    //     .then(data => {
    //       setFavorites(data);
    //       setLoading(false);
    //     }) :
    //   setLoading(false);
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        {loading ?
          <Loader /> :
          favorites.map((favoriteCity, i) => (
            <WeatherCard
              className="favorite-card"
              key={i}
              label={favoriteCity.LocalizedName}
              currentTempUnit={favoriteCity.Temperature.Imperial.Unit}
              temperature={favoriteCity.Temperature.Imperial.Value}
              weatherText={favoriteCity.WeatherText}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Favorites
