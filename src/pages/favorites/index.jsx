import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedCityAction } from '../../store/actions';
// Components
import WeatherCard from "../../components/weather-card";
import Message from '../../components/message';
import Loader from '../../components/loader';
// Services
import * as weatherService from '../../services/weather-service'
// Style
import './index.css';
// Services
import { currentConditionsError } from '../../helpers';

const Favorites = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(useSelector(state => state.favorites));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchConditions = () => {
    favorites.length ?
      Promise.all(favorites.map(async favorite => {
        const res = await weatherService.currentConditions(favorite.Key);
        if (res.name && res.name === 'Error') {
          setError(currentConditionsError);
          return;
        }
        return {
          ...favorite,
          ...(await weatherService.currentConditions(favorite.Key)).data[0]
        }
      }))
        .then(data => {
          setFavorites(data);
          setLoading(false);
        }) :
      setLoading(false);
  }

  const handleFavoriteClick = selectedCityObject => {
    dispatch(setSelectedCityAction({...selectedCityObject, redirectFromFavorite: true}));
    history.push("/ben-michaeli-07-06-2020");
  }

  return (
    <div className="favorites-page">
      <div className="favorites-container">
        {error ?
          <div className="message">
            <Message type="error" text={error} />
          </div> :
          !favorites.length ?
            <div className="message">
              <Message type="info" text="Favorites List Is Empty" />
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
