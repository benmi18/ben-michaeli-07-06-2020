import React from 'react'

const WeatherIcon = ({ icon, className }) => (
  <img className={className} src={require(`../../assets/images/weather-icons/${icon}.png`)} alt="Weather Icon" />
);

export default WeatherIcon;
