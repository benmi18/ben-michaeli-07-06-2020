import { blue, blueGrey } from '@material-ui/core/colors';

const initialState = {
  isDarkMode: false,
  palletteType: 'light',
  primaryColor: blue
}

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':{
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        palletteType: !state.isDarkMode ? "dark" : "light",
        primaryColor: !state.isDarkMode ? blueGrey : blue
      };
    }
  
    default: {
      return state;
    }
  }
}

export default darkModeReducer;
