import axios from 'axios';

const BASE_URL = 'http://dataservice.accuweather.com';
const LOCATION_URL = 'locations/v1/cities';
const CURRENT_CONDITION_URL = 'currentconditions/v1';
const FORECASTS_URL = 'forecasts/v1/daily/5day';
const API_KEY = 'apikey=F65ITMcva7VLGjfdqpDi1gJOQwOMOiXX';

export const citySearch = query => {
  return axios.get(`${BASE_URL}/${LOCATION_URL}/search?${API_KEY}&q=${query}`);
}

export const autocomplete = query => {
  return axios.get(`${BASE_URL}/${LOCATION_URL}/autocomplete?${API_KEY}&q=${query}`);
}

export const currentConditions = locationKey => {
  try {
    return axios.get(`${BASE_URL}/${CURRENT_CONDITION_URL}/${locationKey}?${API_KEY}`);
  } catch (error) {
    return error;    
  }
}

export const forecasts = locationKey => {
  return axios.get(`${BASE_URL}/${FORECASTS_URL}/${locationKey}?${API_KEY}`);
}
