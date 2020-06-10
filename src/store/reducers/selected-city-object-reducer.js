const initialState = {
  Key: '215854',
  LocalizedName: 'Tel Aviv',
  Type: 'City',
  Country: {
    ID: "IL",
    LocalizedName: "Israel"
  }
}

const selectedCityObjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CITY_OBJECT': {
      return {
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
}

export default selectedCityObjectReducer;
