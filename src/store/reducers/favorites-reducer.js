const initialState = [
  {
    Key: '215854',
    LocalizedName: 'Tel Aviv'
  },
  {
    Key: '169072',
    LocalizedName: 'Telavi'
  },
  {
    Key: '186933',
    LocalizedName: 'Tela'
  },
  {
    Key: '169072',
    LocalizedName: 'Telavi'
  },
  {
    Key: '186933',
    LocalizedName: 'Tela'
  },
  {
    Key: '169072',
    LocalizedName: 'Telavi'
  },
  {
    Key: '186933',
    LocalizedName: 'Tela'
  },
  {
    Key: '169072',
    LocalizedName: 'Telavi'
  },
  {
    Key: '186933',
    LocalizedName: 'Tela'
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
