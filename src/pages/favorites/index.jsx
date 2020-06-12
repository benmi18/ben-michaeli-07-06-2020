import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedCityAction } from '../../store/actions';
// Components
import WeatherCard from "../../components/weather-card";
import EmptyMessage from '../../components/empty-message';
import Loader from '../../components/loader';
// Services
import * as weatherService from '../../services/weather-service/weatherService'
// Style
import './index.css';

const Favorites = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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

  const handleFavoriteClick = selectedCityObject => {
    dispatch(setSelectedCityAction(selectedCityObject));
    history.push("/");
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        {!favorites.length ?
          <div className="empty-message">
            <EmptyMessage text="Favorites List Is Empty" />
          </div> :
          loading ?
            <Loader /> :
            favorites.map(favoriteCity => (
              <div key={favoriteCity.Key} onClick={() => handleFavoriteClick(favoriteCity)}>
                <WeatherCard
                  className="favorite-card"
                  label={favoriteCity.LocalizedName}
                  currentTempUnit={favoriteCity.Temperature.Imperial.Unit}
                  temperature={favoriteCity.Temperature.Imperial.Value}
                  weatherText={favoriteCity.WeatherText}
                  icon={favoriteCity.WeatherIcon}
                />
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Favorites
