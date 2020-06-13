import React, { useEffect, useState, Fragment } from 'react';
// Material
import { Card, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// Style
import './index.css';
// Store
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavoriteAction } from '../../store/actions';
// Components
import WeatherCard from '../weather-card';
import WeatherIcon from "../weather-icon";
import Loader from '../loader';
// Services
import * as moment from 'moment';
import * as weatherService from "../../services/weather-service/weatherService";
import Temperature from '../temperature';
import Message from '../message';

const ForecastsPanel = () => {
  // State
  const [forecasts, setForecasts] = useState({});
  const [loading, setLoading] = useState(true);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [error, setError] = useState(false);

  // From store
  const dispatch = useDispatch();
  const selectedCity = useSelector(store => store.selectedCity);
  const { selectedUnit } = useSelector(store => store.tempUnit);
  const favorites = useSelector(state => state.favorites)

  useEffect(() => {
    isSelectedCityInFavorites();
    fetchCurrentCityConditions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity, favorites]);

  const fetchCurrentCityConditions = async () => {
    const res = await weatherService.forecasts(selectedCity.Key);
    if (res.name && res.name === 'Error') {
      setError(res.message);
    } else {
      const todayForecast = res.data.DailyForecasts[0];
      setForecasts({
        originData: res.data,
        dailyForecasts: res.data.DailyForecasts,
        headline: res.data.Headline.Text,
        currentTemperatureUnit: todayForecast.Temperature.Minimum.Unit,
        currentDayTemperature: todayForecast.Temperature.Minimum.Value,
        icon: todayForecast.Day.Icon
      });
    }
    setLoading(false);
  }

  const toggleFavorites = () => {
    dispatch(toggleFavoriteAction({
      Key: selectedCity.Key,
      LocalizedName: selectedCity.LocalizedName
    }));
    isSelectedCityInFavorites();
  }

  const isSelectedCityInFavorites = () => {
    setIsInFavorites(!!favorites.find(city => city.Key === selectedCity.Key));
  }

  return (
    <Card className="forecasts-panel" variant="outlined">
      {error ?
        <Message type="error" text={error} /> : 
      loading ?
        <Loader /> :
        <Fragment>
          <div className="top-row">
            <div className="city-details">
              <WeatherIcon className="weather-icon" icon={forecasts.icon} />
              <div className="city-name">
                <div>{selectedCity.LocalizedName}</div>
                <Temperature
                  currentDayTemperature={forecasts.currentDayTemperature}
                  selectedUnit={selectedUnit}
                  currentTemperatureUnit={forecasts.currentTemperatureUnit}
                />
              </div>
            </div>
            <div className="favorites">
              <IconButton onClick={toggleFavorites}>
                {isInFavorites ?
                  <FavoriteIcon className="favorites-icon" /> :
                  <FavoriteBorderIcon className="favorites-icon" />
                }
              </IconButton>
            </div>
          </div>
          <div className="headline">{forecasts.headline}</div>
          <div className="weather-forecasts">
            {forecasts.dailyForecasts.map((day, i) => (
              <WeatherCard
                key={i}
                label={moment(day.Date).format('dddd')}
                currentTempUnit={day.Temperature.Minimum.Unit}
                temperature={day.Temperature.Minimum.Value}
                icon={day.Day.Icon}
              />
            ))}
          </div>
        </Fragment>
      }
    </Card>
  );
}

export default ForecastsPanel;
