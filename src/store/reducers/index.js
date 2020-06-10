import { combineReducers } from "redux";

// Reducers
import darkModeReducer from "./darkMode-reducer";
import temperatureUnitReducer from "./temperature-unit-reducer";
import selectedCityObjectReducer from "./selected-city-object-reducer";

const rootReducer = combineReducers({
  darkModeTheme: darkModeReducer,
  tempUnit: temperatureUnitReducer,
  selectedCity: selectedCityObjectReducer
});

export default rootReducer;
