const initialState = {
  selectedUnit: 'C'
}

const temperatureUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_TEMPERATURE_UNIT':{
      return {
        ...state,
        selectedUnit: action.payload
      };
    }
  
    default: {
      return state;
    }
  }
}

export default temperatureUnitReducer;
