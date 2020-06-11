import React, { useEffect, useState, Fragment } from 'react';
// Material
import { Card, IconButton } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
// Style
import './index.css';
// Store
import { useSelector, useDispatch, useStore } from 'react-redux';
import { toggleFavoriteAction } from '../../store/actions';
// Components
import WeatherCard from '../weather-card';
import Loader from '../loader';
// Services
import * as moment from 'moment';
import * as weatherService from "../../services/weather-service/weatherService";
import { temperatureConverter } from '../../helpers';

const ForecastsPanel = () => {
  // State
  const [forecasts, setForecasts] = useState({});
  const [loading, setLoading] = useState(true);
  const [isInFavorites, setIsInFavorites] = useState(false);
  
  // From store
  const store = useStore();
  const dispatch = useDispatch();
  const selectedCity = useSelector(store => store.selectedCity);
  const { selectedUnit } = useSelector(store => store.tempUnit);

  useEffect(() => {
    isSelectedInFavorites();    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity])

  useEffect(() => {
    fetchCurrentConditions();
    isSelectedInFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCurrentConditions = async () => {
    // TODO: remove mock
    // const res = await weatherService.forecasts(selectedCity.Key);
    const res = mockForecasts;

    const thisDayForecasts = res.data.DailyForecasts.find(x => moment().isSame(x.Date, 'day'));
    setForecasts({
      originData: res.data,
      dailyForecasts: res.data.DailyForecasts,
      headline: res.data.Headline.Text,
      currentTemperatureUnit: thisDayForecasts.Temperature.Minimum.Unit,
      currentDayTemperature: thisDayForecasts.Temperature.Minimum.Value
    });
    setLoading(false);
  }

  const toggleFavorites = () => {
    dispatch(toggleFavoriteAction(selectedCity));
    isSelectedInFavorites();
  }

  const isSelectedInFavorites = () => {
    setIsInFavorites(!!store.getState().favorites.find(city => city.Key === selectedCity.Key));
  }

  return (
    <Card className="forecasts-panel" variant="outlined">
      {loading ?
        <Loader /> :
        <Fragment>
          <div className="top-row">
            <div className="city-details">
              <div className="weather-icon">icon</div>
              <div className="city-name">
                <div>{selectedCity.LocalizedName}</div>
                <div>
                  {temperatureConverter(forecasts.currentDayTemperature, selectedUnit, forecasts.currentTemperatureUnit)}
                  <span> &#176;</span>
                  <span>{selectedUnit}</span>
                </div>
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
              />
            ))}
          </div>
        </Fragment>
      }
    </Card>
  );
}

export default ForecastsPanel;


const mockForecasts = {
  data: {
    "Headline": {
      "EffectiveDate": "2020-06-12T14:00:00+03:00",
      "EffectiveEpochDate": 1591959600,
      "Severity": 4,
      "Text": "Air quality will be unhealthy for sensitive groups Friday afternoon through Sunday morning",
      "Category": "air quality",
      "EndDate": "2020-06-14T14:00:00+03:00",
      "EndEpochDate": 1592132400,
      "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
      "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    },
    "DailyForecasts": [
      {
        "Date": "2020-06-09T07:00:00+03:00",
        "EpochDate": 1591675200,
        "Temperature": {
          "Minimum": {
            "Value": 67,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 83,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
      },
      {
        "Date": "2020-06-10T07:00:00+03:00",
        "EpochDate": 1591761600,
        "Temperature": {
          "Minimum": {
            "Value": 68,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 82,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 33,
          "IconPhrase": "Clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
      },
      {
        "Date": "2020-06-11T07:00:00+03:00",
        "EpochDate": 1591848000,
        "Temperature": {
          "Minimum": {
            "Value": 69,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 82,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 1,
          "IconPhrase": "Sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 34,
          "IconPhrase": "Mostly clear",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
      },
      {
        "Date": "2020-06-12T07:00:00+03:00",
        "EpochDate": 1591934400,
        "Temperature": {
          "Minimum": {
            "Value": 68,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 83,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 2,
          "IconPhrase": "Mostly sunny",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 37,
          "IconPhrase": "Hazy moonlight",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
      },
      {
        "Date": "2020-06-13T07:00:00+03:00",
        "EpochDate": 1592020800,
        "Temperature": {
          "Minimum": {
            "Value": 70,
            "Unit": "F",
            "UnitType": 18
          },
          "Maximum": {
            "Value": 85,
            "Unit": "F",
            "UnitType": 18
          }
        },
        "Day": {
          "Icon": 5,
          "IconPhrase": "Hazy sunshine",
          "HasPrecipitation": false
        },
        "Night": {
          "Icon": 37,
          "IconPhrase": "Hazy moonlight",
          "HasPrecipitation": false
        },
        "Sources": [
          "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
      }
    ]
  }
}
