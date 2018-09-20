import { SET_PLACES, REMOVE_PLACES } from '../actions/actionTypes'

initialState = {
  places: []
}

const placesReducers = (state = initialState, action) => {

  switch (action.type) {
    
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      }

    case REMOVE_PLACES: 
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key
        })
      }

    default:
      return state
  }
}

export default placesReducers