const initialState = [
  {
    Key: "215854",
    LocalizedName: "Tel Aviv"
  }
]

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      return state.find(city => city.Key === action.payload.Key) ?
        [...state.filter(fav => fav.Key !== action.payload.Key)] :
        [...state, action.payload]
    }

    default: {
      return state;
    }
  }
}

export default favoritesReducer;
