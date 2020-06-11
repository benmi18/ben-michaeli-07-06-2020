import { combineReducers } from "redux";

// Reducers
import darkModeReducer from "./darkMode-reducer";
import temperatureUnitReducer from "./temperature-unit-reducer";
import selectedCityObjectReducer from "./selected-city-object-reducer";
import favoritesReducer from "./favorites-reducer";

const rootReducer = combineReducers({
  darkModeTheme: darkModeReducer,
  tempUnit: temperatureUnitReducer,
  selectedCity: selectedCityObjectReducer,
  favorites: favoritesReducer
});

export default rootReducer;
