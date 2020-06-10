import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import {temperatureConverter} from '../../helpers';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    width: 175
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 18
  },
  mb10: {
    marginBottom: 10
  },
  mb30: {
    marginBottom: 30
  },
  mb60: {
    marginBottom: 60
  }
});

const WeatherCard = ({ label, temperature, weatherText, currentTempUnit }) => {
  const classes = useStyles();
  const {selectedUnit} = useSelector(store => store.tempUnit);
  
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <div className={classes.mb10}>
          {label}
        </div>
        <div className={classes.mb30}>
          {temperatureConverter(temperature, selectedUnit, currentTempUnit)}
          <span> &#176;</span>
          <span>{selectedUnit}</span>
        </div>
        {weatherText &&
          <div className={classes.mb60}>
            {weatherText}
          </div>
        }
      </CardContent>
    </Card>
  );
}

export default WeatherCard;
