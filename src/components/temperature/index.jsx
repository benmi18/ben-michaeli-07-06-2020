import React, { Fragment } from 'react'
import { temperatureConverter } from '../../helpers';

const Temperature = ({ currentDayTemperature, selectedUnit, currentTemperatureUnit }) => (
  <Fragment>
    {temperatureConverter(currentDayTemperature, selectedUnit, currentTemperatureUnit)}
    <span> &#176;</span>
    <span>{selectedUnit}</span>
  </Fragment>
);

export default Temperature
