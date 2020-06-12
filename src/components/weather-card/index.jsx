import React from 'react';
import { useSelector } from 'react-redux';
// Material
import { Card, CardContent } from '@material-ui/core';
// Services
import {temperatureConverter} from '../../helpers';
// Style
import './index.css';
import WeatherIcon from '../weather-icon';

const WeatherCard = ({ label, temperature, weatherText, currentTempUnit, className, icon }) => {
  const {selectedUnit} = useSelector(store => store.tempUnit);
  
  return (
    <Card className={`weather-card ${className}`} variant="outlined">
      <CardContent className="card-content">
        <div className="label">
          {label}
        </div>
        <div className="temperature">
          {temperatureConverter(temperature, selectedUnit, currentTempUnit)}
          <span> &#176;</span>
          <span>{selectedUnit}</span>
        </div>
        {weatherText &&
          <div className="weather-text">
            {weatherText}
          </div>
        }
        {icon && <WeatherIcon className="weather-icon" icon={icon} />}
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
