import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import {temperatureConverter} from '../../helpers';
import { useSelector } from 'react-redux';
// Style
import './index.css';

const WeatherCard = ({ label, temperature, weatherText, currentTempUnit, className }) => {
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
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
